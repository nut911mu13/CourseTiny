const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const bouncer = require('koa-bouncer');
const cors = require('koa2-cors');
const mysql = require('promise-mysql');
const path = require('path');
const session = require('koa-session');
const mysqlConfig = require('./config/mysql');
const router = require('./routes');

const sessionStore = {};

const pool = mysql.createPool(mysqlConfig);

pool.on('acquire', (connection) => {
  // console.log(`Connection ${connection.threadId} acquired`);
});

pool.on('enqueue', () => {
  console.log('Waiting for available connection slot');
});

pool.on('release', (connection) => {
  // console.log(`Connection ${connection.threadId} released`);
});

async function connectDB(ctx, next) {
  ctx.db = await pool.getConnection();
  try {
    await next();
  } finally {
    ctx.db.release();
  }
}

async function bouncerHandleError(ctx, next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: error.message,
      };
      return;
    }
    throw error;
  }
}

const CONFIG = {
  key: 'corsetiny:sess',
  maxAge: 'session',
  overwrite: true,
  httpOnly: true,
  store: {
    get(key, maxAge, { rolling }) {
      return sessionStore[key];
    },
    set(key, sess, maxAge, { rolling, changed }) {
      sessionStore[key] = sess;
    },
    destroy(key) {
    },
  },
};

const logger = async (ctx, next) => {
  console.log('----------------------------------------');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};

const app = new Koa();
app.keys = ['super secret key'];
app
  .use(logger)
  .use(serve(path.join(__dirname, '/public')))
  .use(connectDB)
  .use(session(CONFIG, app))
  .use(cors({
    origin: 'http://localhost:3000',
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }))
  .use(koaBody({ multipart: true }))
  .use(bouncer.middleware())
  .use(bouncerHandleError)
  .use(router.routes())
  .listen(3030);

