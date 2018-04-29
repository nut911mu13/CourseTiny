// const { user } = require('../repository');

async function validateProfile(ctx, next) {
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
  ctx.validateBody('username')
    .required('username required')
    .isString()
    .trim()
    .isLength(2, 128, 'lastname must be 2-128 chars');
  ctx.validateBody('mobileNumber')
    .required('mobileNumber required')
    .isString()
    .trim();
  // .match(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/i, 'mobileNumber wrong format ');
  // ctx.validateBody('email')
  //   .required('Email required')
  //   .isString()
  //   .trim()
  //   .isEmail('Invalid email format');
  ctx.validateBody('sex')
    .required('sex required')
    .isString()
    .trim()
    .isIn(['male', 'female'], 'Sex must be Male or Female');
  ctx.validateBody('birthday')
    .required('birthday required')
    .isString()
    .trim()
    .match(/^\d{4}-\d{2}-\d{2}$/, 'birthday format is invalid');
  await next();
}

async function validateProfileBasic(ctx, next) {
  ctx.validateBody('aboutMe')
    .isString()
    .trim()
    .isLength(2, 1000, 'about me must be 2-1000 chars');
  ctx.validateBody('website')
    .optional()
    .isString()
    .trim()
    .isLength(2, 255, 'website must be 2-255 chars')
    .match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  await next();
}

async function validateProfileEducation(ctx, next) {
  ctx.validateBody('university')
    .required('University required')
    .isString()
    .trim()
    .isLength(2, 255, 'university must be 2-255 chars');
  ctx.validateBody('facility')
    .required('Facility required')
    .isString()
    .trim()
    .isLength(2, 255, 'facility must be 2-255 chars');
  ctx.validateBody('degree')
    .required('Degree required')
    .trim()
    .isString();
  ctx.validateBody('educationPhoto')
    .required('Education photo required')
    .trim()
    .isString();
  await next();
}

async function validateProfileExperience(ctx, next) {
  ctx.validateBody('company')
    .required('company required')
    .isString()
    .trim()
    .isLength(2, 255, 'company must be 2-255 chars');
  ctx.validateBody('position')
    .required('position required')
    .isString()
    .trim()
    .isLength(2, 255, 'position must be 2-255 chars');
  ctx.validateBody('startMonth')
    .required('Start month required')
    .toInt('Invalid start month');
  ctx.validateBody('startYear')
    .required('Start year required')
    .toInt('Invalid start year');
  ctx.validateBody('endMonth')
    .optional()
    .toInt('Invalid end month');
  ctx.validateBody('endYear')
    .optional()
    .toInt('Invalid end year');
  ctx.validateBody('isCurrent')
    .toBoolean();
  await next();
}

async function validateProfileSkill(ctx, next) {
  ctx.validateBody('name')
    .required('skill name required')
    .isString()
    .trim()
    .isLength(2, 128, 'skill must be 2-128 chars');
  ctx.validateBody('level')
    .required('level required')
    .isString()
    .trim()
    .isLength(2, 255, 'level must be 2-128 chars');
  await next();
}
async function validateProfilePayment(ctx, next) {
  ctx.validateBody('bank')
    .required('bank required')
    .isInt('bank must be an integer');
  ctx.validateBody('branch')
    .required('branch required')
    .isString()
    .trim();
  ctx.validateBody('accountNo')
    .required('accountNo required')
    .isString()
    .trim();
  // .isNumeric();
  ctx.validateBody('bookPhoto')
    .required('bookPhoto required')
    .isString()
    .trim();
  await next();
}
async function validateProfileIdCard(ctx, next) {
  ctx.validateBody('number')
    .required('number required')
    .isString()
    .trim()
    .isNumeric()
    .isLength(13, 13, 'number must be 13 chars');
  ctx.validateBody('titleId')
    .required('titleId required')
    .isInt('titleId must be an integer');
  ctx.validateBody('firstName')
    .required('firstName required')
    .isString()
    .trim()
    .isLength(2, 255, 'firstname must be 2-255 chars');
  ctx.validateBody('lastName')
    .required('lastName required')
    .isString()
    .trim()
    .isLength(2, 255, 'lastName must be 2-255 chars');
  ctx.validateBody('maritalStatusId')
    .required('maritalStatusId required')
    .isInt('maritalStatusId must be an integer');
  ctx.validateBody('currentAddress')
    .required('currentAddress required')
    .isString()
    .trim();
  ctx.validateBody('idCardAddress')
    .required('idCardAddress required')
    .isString()
    .trim();
  ctx.validateBody('idCardPhoto')
    .required('idCardPhoto required')
    .isString()
    .trim();
  await next();
}

module.exports = {
  validateProfile,
  validateProfileBasic,
  validateProfilePayment,
  validateProfileEducation,
  validateProfileExperience,
  validateProfileSkill,
  validateProfileIdCard,

};
