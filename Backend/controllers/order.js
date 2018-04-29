const repo = require('../repository');
const moment = require('moment');
const { uploadPhoto, deleteFile } = require('../libs/helpers');

async function get(ctx) {
  const result = await repo.order.get(ctx.db, ctx.params.id);

  if (!result) {
    ctx.status = 404;
    ctx.body = { error: 'order not found' };
    return;
  }

  const {
    id,
    vat,
    totalPriceVatIncl,
    totalPriceVatExcl,
    totalQuantity,
    createdAt,
    expiredAt,
    courseId,
    title,
    cover,
    startDate,
    endDate,
    location,
    orderStatusId,
  } = result;

  if (orderStatusId === 1 && moment(expiredAt).diff(moment(), 'seconds') < 1) {
    ctx.status = 400;
    ctx.body = { error: 'order holding time was out.' };
    return;
  }

  const order = {
    id,
    vat,
    totalPriceVatIncl,
    totalPriceVatExcl,
    totalQuantity,
    createdAt,
    expiredAt,
    orderStatusId,
    remainingTime: moment(expiredAt).diff(moment(), 'seconds'),
  };

  const course = {
    id: courseId,
    title,
    cover,
    startDate: moment(startDate).format('DD MMMM YYYY'),
    endDate,
    location,
  };

  order.tickets = await repo.order.getTicketsByOrderId(ctx.db, ctx.params.id);
  ctx.body = { order, course };
}

// user id มาจาก session
// ถ้าคอร์สของตั๋วไม่ตรงกันทั้งหมดให้ return error
async function create(ctx) {
  const requestedTickets = ctx.request.body.tickets;
  const requestedTicketId = requestedTickets.map(t => t.id);
  const tickets = await repo.order.getRemainingTicket(ctx.db, requestedTicketId);
  let courseId;
  let error = false;
  const requestOrder = [];
  requestedTickets.forEach((rt) => {
    let idCount = 0;
    tickets.forEach((t) => {
      // check course id consistency
      if (courseId !== t.courseId) {
        courseId = t.courseId;
        idCount += 1;
      }
      if (rt.id === t.id) { // check remaining
        if (rt.amount > t.remaining) {
          error = true;
        }
        requestOrder.push({ ...rt, price: t.price, name: t.name }); // make request order
      }
    });
    if (idCount > 1) {
      error = true;
    }
  });

  if (error) {
    ctx.status = 400;
    ctx.body = { error: 'remaining tickets are less than you have requested' };
    return;
  }
  // make an order
  const { userId } = ctx.session;
  const vat = 7;
  const formatDT = 'YYYY-MM-DD HH:mm:ss';
  const createdAt = moment();
  const expiredAt = moment(createdAt).add(15, 'minutes');
  const totalPriceVatExcl = requestOrder.reduce((p, v) => p + (v.price * (v.amount || 0)), 0);
  const totalPriceVatIncl = Math.ceil(totalPriceVatExcl + ((totalPriceVatExcl * vat) / 100));
  const totalQuantity = requestOrder.reduce((p, v) => p + (v.amount || 0), 0);
  const order = {
    vat,
    courseId,
    totalPriceVatIncl,
    totalPriceVatExcl,
    totalQuantity,
    createdAt: createdAt.format(formatDT),
    expiredAt: expiredAt.format(formatDT),
    tickets: requestedTickets,
  };
  try {
    await ctx.db.beginTransaction();
    const orderId = await repo.order.store(ctx.db, userId, order);
    // insert ticket
    const tasks = [];
    requestOrder.forEach(async (ro) => {
      // insert ticket according to request quantity
      for (let i = 0; i < ro.amount; i += 1) {
        tasks.push(repo.order.addTicket(ctx.db, orderId, ro.id, ro.price));
      }
    });
    await Promise.all(tasks);
    await ctx.db.commit();
    ctx.body = {
      order: {
        id: `B${createdAt.format('YYMMDD')}-${courseId}-${orderId}`,
      },
    };
  } catch (err) {
    console.log(`rollback: ${err.message}`);
    await ctx.db.rollback();
    ctx.status = 400;
    ctx.body = { error: 'cannot create order' };
  }
}

async function confirm(ctx) {
  const { id } = ctx.params;
  const { buyer, ticketBuyers } = ctx.request.body;
  const expiredAt = await repo.order.getExpire(ctx.db, id);

  if (moment(expiredAt).diff(moment(), 'seconds') < 1) {
    ctx.status = 400;
    ctx.body = { error: 'order holding time was out.' };
    return;
  }

  const order = {
    email: buyer.email,
    firstName: buyer.firstName,
    lastName: buyer.lastName,
    mobileNumber: buyer.mobileNumber,
    status: 2,
  };
  try {
    await ctx.db.beginTransaction();
    await repo.order.update(ctx.db, id, order);
    const tasks = ticketBuyers.map(tb => (
      repo.order.updateTicket(ctx.db, +tb.id, {
        email: tb.same ? buyer.email : tb.email,
        firstName: tb.same ? buyer.firstName : tb.firstName,
        lastName: tb.same ? buyer.lastName : tb.lastName,
        mobileNumber: tb.same ? buyer.mobileNumber : tb.mobileNumber,
      })
    ));
    await Promise.all(tasks);
    await ctx.db.commit();
    ctx.body = {};
  } catch (error) {
    console.log(`rollback: ${error.message}`);
    await ctx.db.rollback();
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function remove(ctx) {
  const { id } = ctx.params;
  await repo.order.remove(ctx.db, id);
  ctx.body = {};
}

async function getHistory(ctx) {
  const sessionId = ctx.session.userId;
  const { id } = ctx.params;
  const roleId = await repo.order.checkRoleById(ctx.db, sessionId);
  if (+id !== sessionId && roleId !== 3) {
    ctx.status = 400;
    ctx.body = { error: 'unauthorization' };
    return;
  }
  let orders = await repo.order.getOrderByUserId(ctx.db, id);
  orders = orders.filter(o => o.status > 1); // not include holding order
  ctx.body = { orders };
}

async function insertPayment(ctx) {
  const courseDir = 'images/courses/';
  const imagePath = await uploadPhoto(ctx.request.body.files.cover, courseDir);
  const {
    orderId,
    paymentMethod,
    transferDate,
    bankId,
  } = ctx.request.body.fields;
  const payment = {
    orderId,
    paymentMethod,
    transferDate,
    bankId,
    cover: imagePath,
  };
  const affectedRows = await repo.order.addPayment(ctx.db, payment);
  if (!affectedRows) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: 'insert failed' };
    return;
  }
  ctx.body = {};
}

module.exports = {
  get,
  create,
  confirm,
  getHistory,
  insertPayment,
  remove,
};
