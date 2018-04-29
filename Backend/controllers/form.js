const repo = require('../repository');

async function idcard(ctx) {
  const nameTitles = await repo.user.getNameTitle(ctx.db);
  const maritalStatus = await repo.user.getMaritalStatus(ctx.db);
  ctx.body = {
    nameTitles,
    maritalStatus,
  };
}

module.exports = {
  idcard,
};
