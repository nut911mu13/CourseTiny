async function validateCreateCourse(ctx, next) {
  ctx.validateBody('file')
    .required('file required')
    .isString()
    .trim();
  ctx.validateBody('title')
    .required('title required')
    .isString()
    .trim()
    .isLength(2, 255, 'title must be 2-255 chars');
  ctx.validateBody('startDay')
    .required('startDay required')
    .isString()
    .trim()
    .match(/^\d{4}-\d{2}-\d{2}$/, 'day format is invalid');
  ctx.validateBody('endDay')
    .required('endDay required')
    .isString()
    .trim()
    .match(/^\d{4}-\d{2}-\d{2}$/, 'day format is invalid');
  ctx.validateBody('location')
    .required('location required')
    .isString()
    .trim()
    .isLength(2, 1500, 'location must be 2-1500 chars');
  ctx.validateBody('description')
    .required('description required')
    .isString()
    .trim()
    .isLength(2, 3500, 'description must be 2-3500 chars');
  ctx.validateBody('category')
    .required('category required')
    .isString()
    .trim()
    .isNumeric();
  ctx.validateBody('courseStatus')
    .required('courseStatus required')
    .isString()
    .trim()
    .isNumeric();
  ctx.validateBody('ticket')
    .required('ticket required')
    .isString()
    .trim();
  ctx.validateBody('type')
    .required('type required')
    .isString()
    .trim();
  await next();
}

module.exports = {
  validateCreateCourse,
};
