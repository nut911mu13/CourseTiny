const repo = require('../repository');

async function list(ctx) {
  const categories = await repo.course.listCategories(ctx.db);
  ctx.body = { categories };
}

module.exports = {
  list,
};
