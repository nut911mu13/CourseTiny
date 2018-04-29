const router = require('koa-router')();
const ctrl = require('./controllers');
const m = require('./middlewares');

router
  .prefix('/api')
  // route that need user authorization
  .use([
    '/auth/check',
  ], m.auth.validateAuth)
  // auth
  .post('/auth/signup', m.auth.validateSignup, ctrl.auth.signup)
  .post('/auth/signin', m.auth.validateSignin, ctrl.auth.signin)
  .get('/auth/signout', ctrl.auth.signout)
  .post('/auth/verify', ctrl.auth.verify)
  .get('/auth/check', ctrl.auth.checkAuthorization)
  .post('/auth/checkemail', ctrl.auth.checkEmail)
  .post('/auth/forgetpassword', ctrl.user.forgetPassword)

  // courses
  .get('/courses/:id/tickets', ctrl.course.getTickets) // done
  .get('/courses/:title', ctrl.course.getByTitle) // done
  .patch('/courses/:id', ctrl.course.editCourse)
  .get('/courses', ctrl.course.list) // done
  .post('/courses', ctrl.course.create)

  // user
  // profile index tab
  .patch('/user/:id', m.user.validateProfile, ctrl.user.editProfile) // done todo: recheck
  .post('/user/:id/profile-photo', ctrl.user.updateProfilePhoto) // done
  .patch('/user/:id/basic', m.user.validateProfileBasic, ctrl.user.editBasicProfile) // ctrl done todo: rename validateProfileBasic
  .patch('/user/:id/password', ctrl.user.editPassword) // done todo: validate
  // profile resume tab
  .post('/user/:id/education', ctrl.user.insertEducation) // m.user.validateProfileEducation, // ctrl done todo: validation
  .post('/user/:id/experience', m.user.validateProfileExperience, ctrl.user.insertExperience) // done
  .post('/user/:id/skills', m.user.validateProfileSkill, ctrl.user.insertSkills) // done
  .post('/user/:id/idcard', ctrl.user.insertIdCard) // m.user.validateProfileIdCard // ctrl done todo: validation
  .post('/user/:id/bank', ctrl.user.insertBank)// m.user.validateProfilePayment // ctrl done todo: validation
  .patch('/user/:id/education/:eduId', ctrl.user.editEducation) // m.user.validateProfileEducation // ctrl done todo: validation
  .patch('/user/:id/experience/:expId', m.user.validateProfileExperience, ctrl.user.editExperience) // done todo: recheck
  .patch('/user/:id/skills/:skillId', m.user.validateProfileSkill, ctrl.user.editSkill) // done todo: recheck
  .delete('/user/:id/education/:eduId', ctrl.user.deleteEducation) // done
  .delete('/user/:id/experience/:expId', ctrl.user.deleteExperience) // done
  .delete('/user/:id/skills/:skillId', ctrl.user.deleteSkill) // done
  .get('/user/:id/orders', ctrl.order.getHistory) // TODO : BIG
  .get('/user/courses', ctrl.course.coursesByUser)
  .get('/user/:id', ctrl.user.getProfile) // done todo: validation
  .get('/user', () => {})
  // categories
  .get('/categories', ctrl.category.list)

  // form options
  .get('/forms/idcard', ctrl.form.idcard) // done

  // order
  .get('/orders/:id', ctrl.order.get) // done
  .patch('/orders/:id', ctrl.order.confirm) // done
  .delete('/orders/:id', ctrl.order.remove) // done
  .post('/orders/payment', ctrl.order.insertPayment) // need testing
  .post('/orders', ctrl.order.create); // done
module.exports = router;
