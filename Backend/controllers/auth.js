const repo = require('../repository');
const bcrypt = require('bcrypt');
const { defaultPhoto } = require('../config/app');

async function signup(ctx) {
  const user = ctx.request.body;
  const emailExist = await repo.user.findByEmail(ctx.db, user.email);
  if (emailExist) {
    ctx.status = 400;
    ctx.body = { error: 'this email is already used' };
    return;
  }
  user.password = await bcrypt.hash(user.password, 10);
  user.profilePhoto = defaultPhoto;
  const insertId = await repo.user.store(ctx.db, user);
  if (!insertId) {
    ctx.status = 400;
    ctx.body = { error: 'create new user failed' };
    return;
  }
  ctx.session.userId = insertId;
  ctx.body = { userId: ctx.session.userId, profilePhoto: user.profilePhoto };
}

async function signin(ctx) {
  const form = ctx.request.body;
  const user = await repo.user.findByEmail(ctx.db, form.email);
  if (!user) {
    ctx.status = 400;
    ctx.body = {
      error: 'Email not found',
    };
    return;
  }
  const isMatched = await bcrypt.compare(form.password, user.password);
  if (!isMatched) {
    ctx.status = 401;
    ctx.body = {
      error: 'Wrong Password',
    };
    return;
  }
  // set cookie age
  ctx.sessionOptions.maxAge = form.remember
    ? 1000 * 60 * 60 * 24 * 30 // maxAge is milliseconds so its 1 mounth
    : 'session';
  ctx.session.userId = user.id;
  ctx.body = { userId: ctx.session.userId, profilePhoto: user.profilePhoto };
}

async function signout(ctx) {
  if (ctx.session.userId) {
    ctx.session.userId = null;
  }
  ctx.body = {};
}

async function checkAuthorization(ctx) {
  const user = await repo.user.findById(ctx.db, ctx.session.userId);
  ctx.body = {
    userId: ctx.session.userId,
    profilePhoto: user.profilePhoto,
  };
}

async function verify(ctx) {
  ctx.body = {};
}

async function checkEmail(ctx) {
  ctx.validateBody('email')
    .required('Email required')
    .isString()
    .trim()
    .isEmail('Invalid email format')
    .check(await repo.user.findByEmail(ctx.db, ctx.request.body.email), 'Email Not fond');
  ctx.body = {};
}

module.exports = {
  signup,
  signin,
  signout,
  verify,
  checkAuthorization,
  checkEmail,
};
