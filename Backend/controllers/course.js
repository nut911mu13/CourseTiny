const { uploadPhoto, deleteFile } = require('../libs/helpers');
const repo = require('../repository');
const moment = require('moment');

const courseDir = 'images/courses/';

async function create(ctx) {
  let imagePath;
  try {
    imagePath = await uploadPhoto(ctx.request.body.files.cover, courseDir);
    const {
      title,
      tickets,
      startDate,
      endDate,
      location,
      description,
      category,
    } = ctx.request.body.fields;
    const course = {
      title,
      startDate,
      endDate,
      location,
      description,
      category,
      tickets: JSON.parse(tickets), // parse object
      cover: imagePath,
    };
    await ctx.db.beginTransaction();
    const insertId = await repo.course.store(ctx.db, course, ctx.session.userId);
    const tasks = course.tickets.map(ticket => repo.course.insertTicket(ctx.db, ticket, insertId));
    await Promise.all(tasks);
    await ctx.db.commit();
    ctx.body = {};
  } catch (error) {
    console.log(`rollback: ${error.message}`);
    await ctx.db.rollback();
    deleteFile(imagePath); // remove uploaded file
    ctx.status = 400;
    ctx.body = { error: 'create failed' };
  }
}

async function editCourse(ctx) {
  const course = ctx.request.body;
  const id = ctx.session.userId;
  const editTitle = ctx.params.title;
  await ctx.db.beginTransaction();
  try {
    await repo.course.updateCourse(ctx.db, course, id, editTitle);
    await ctx.db.commit();
    ctx.body = {};
  } catch (error) {
    await ctx.db.rollback();
    console.log(`rollback: ${error.message}`);
    ctx.status = 400;
    ctx.body = { error: 'edit failed' };
  }
}

async function list(ctx) {
  let courses = await repo.course.list(ctx.db);
  courses = courses.map(c => (
    {
      ...c,
      startDate: moment(c.startDate).format('DD MMMM YYYY'),
      endDate: moment(c.endDate).format('DD MMMM YYYY'),
    }
  ));
  ctx.body = { courses };
}

async function coursesByUser(ctx) {
  const user = ctx.request.body;
  user.id = ctx.session.userId;
  const courses = await repo.course.coursesByUser(ctx.db, user);
  if (!courses) {
    ctx.status = 400;
    ctx.body = { error: 'request failed' };
    return;
  }
  ctx.body = { courses };
}

async function getByTitle(ctx) {
  const { title } = ctx.params;
  const course = await repo.course.findByTitle(ctx.db, title);

  if (!course) {
    ctx.status = 404;
    ctx.body = { error: 'course not found' };
    return;
  }

  course.startDate = moment(course.startDate).format('DD MMMM YYYY');
  course.endDate = moment(course.endDate).format('DD MMMM YYYY');
  if (!course) {
    ctx.status = 404;
    ctx.body = { error: 'course not found' };
    return;
  }
  course.tickets = JSON.parse(course.tickets);
  ctx.body = { course };
}

async function getTickets(ctx) {
  const { id } = ctx.params;
  const tickets = await repo.course.getRemainingTicketByCourseId(ctx.db, id);
  ctx.body = { tickets };
}

module.exports = {
  create,
  editCourse,
  coursesByUser,
  list,
  getByTitle,
  getTickets,
};
