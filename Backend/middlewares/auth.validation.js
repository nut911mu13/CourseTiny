// const { user } = require('../repository');
async function validateAuth(ctx, next) {
  if (!ctx.session || (ctx.session && !ctx.session.userId)) {
    ctx.status = 401;
    ctx.body = { error: 'unauthorized' };
    return;
  }
  await next();
}

async function validateSignin(ctx, next) {
  ctx.validateBody('email')
    .required('Email required')
    .isString()
    .trim()
    .isEmail('Invalid email format');
  ctx.validateBody('password')
    .required('Password required')
    .isString()
    .isLength(6, 255, 'Password must be 6-255 chars');
  ctx.validateBody('rememberMe')
    .toBoolean();
  await next();
}

async function validateSignup(ctx, next) {
  ctx.validateBody('email')
    .required('Email required')
    .isString()
    .trim()
    .isEmail('Invalid email format');
  ctx.validateBody('password')
    .required('Password required')
    .isString()
    .isLength(6, 255, 'Password must be 6-255 chars');
  ctx.validateBody('firstName')
    .required('Firstname required')
    .isString()
    .trim()
    .isLength(2, 255, 'Firstname must be 2-255 chars');
  ctx.validateBody('lastName')
    .required('lastname required')
    .isString()
    .trim()
    .isLength(2, 255, 'lastname must be 2-255 chars');
  ctx.validateBody('mobileNumber')
    .required('mobileNumber required')
    .isString()
    .trim();
  // .match(/^\d{3}-\d{3}-\d{4}$/g, 'mobile number format is invalid');
  ctx.validateBody('sex')
    .required('sex required')
    .isString()
    .trim()
    .tap(x => x.toLowerCase())
    .isIn(['male', 'female'], 'Sex must be Male or Female');
  ctx.validateBody('birthday')
    .required('birthday required')
    .isString()
    .trim()
    .match(/^\d{4}-\d{2}-\d{2}$/, 'birthday format is invalid');
  await next();
}

module.exports = {
  validateAuth,
  validateSignin,
  validateSignup,
};
