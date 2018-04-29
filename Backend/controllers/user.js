const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const repo = require('../repository');
const { uploadPhoto, deleteFile } = require('../libs/helpers');
const { defaultPhoto } = require('../config/app');
const profileDir = 'images/profile/';

async function getProfile(ctx) {
  const userId = ctx.params.id;
  const user = await repo.user.getUserProfile(ctx.db, userId);
  if (!user) {
    ctx.status = 400;
    ctx.body = { error: 'user does not exists' };
    return;
  }
  ctx.body = { user };
}

async function editBasicProfile(ctx) {
  const userId = ctx.params.id;
  const isAffected = await repo.user.updateBasicProfile(ctx.db, userId, ctx.request.body);
  if (!isAffected) {
    ctx.status = 400;
    ctx.body = { error: 'edit profile failed' };
    return;
  }
  ctx.body = {};
}

async function editPassword(ctx) {
  const form = ctx.request.body;
  const userId = ctx.params.id;
  const { password } = await repo.user.findById(ctx.db, userId);
  const isMatched = await bcrypt.compare(form.oldPassword, password);
  if (!isMatched) {
    ctx.status = 400;
    ctx.body = { error: "password don't match" };
    return;
  }
  form.password = await bcrypt.hash(form.password, 10);
  const isAffected = await repo.user.updatePassword(ctx.db, userId, form.password);
  if (!isAffected) {
    ctx.status = 400;
    ctx.body = { error: 'update failed' };
    return;
  }
  ctx.body = {};
}

async function editProfile(ctx) {
  const userId = ctx.params.id;
  const isAffected = await repo.user.updateProfile(ctx.db, userId, ctx.request.body);
  if (!isAffected) {
    ctx.status = 400;
    ctx.body = { error: 'edit profile failed' };
    return;
  }
  ctx.body = {};
}

async function updateProfilePhoto(ctx) {
  const userId = ctx.params.id;
  const profilePhotoDest = `${profileDir}${userId}/`;
  let imagePath;
  try {
    const { profilePhoto } = await repo.user.findById(ctx.db, userId);
    imagePath = await uploadPhoto(ctx.request.body.files.profilePhoto, profilePhotoDest);
    const isAffected = await repo.user.updateProfilePhoto(ctx.db, userId, imagePath);
    if (!isAffected) {
      ctx.status = 400;
      throw new Error('update avatar failed');
    }
    if (profilePhoto !== defaultPhoto) { // don't delete defaultPhoto
      deleteFile(profilePhoto);
    }
    ctx.body = { profilePhoto: imagePath };
  } catch (error) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function insertEducation(ctx) {
  const userId = ctx.params.id;
  const profileEducationPhotoDest = `${profileDir}${userId}/education/`;
  let imagePath;
  try {
    imagePath = await uploadPhoto(ctx.request.body.files.educationPhoto, profileEducationPhotoDest);
    const { university, facility, degree } = ctx.request.body.fields;
    const edu = {
      university,
      facility,
      degree,
      educationPhoto: imagePath,
    };
    const insertId = await repo.user.addEducation(ctx.db, userId, edu);
    if (!insertId) {
      ctx.status = 400;
      throw new Error('Insert failed');
    }
    ctx.body = { insertId };
  } catch (error) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function insertExperience(ctx) {
  const userId = ctx.params.id;
  const insertId = await repo.user.addExperience(ctx.db, userId, ctx.request.body);
  if (!insertId) {
    ctx.status = 400;
    ctx.body = { error: 'Insert failed' };
    return;
  }
  ctx.body = { insertId };
}

async function insertSkills(ctx) {
  const userId = ctx.params.id;
  const insertId = await repo.user.addSkill(ctx.db, userId, ctx.request.body);
  if (!insertId) {
    ctx.status = 400;
    ctx.body = { error: 'insert failed' };
    return;
  }
  ctx.body = { insertId };
}

async function insertIdCard(ctx) {
  const userId = ctx.params.id;
  const profileIdCardPhotoDest = `${profileDir}${userId}/`;
  let imagePath;
  try {
    imagePath = await uploadPhoto(ctx.request.body.files.idCardPhoto, profileIdCardPhotoDest, 'id-card-proof');
    const {
      number,
      titleId,
      firstName,
      lastName,
      maritalStatusId,
      currentAddress,
      idCardAddress,
    } = ctx.request.body.fields;
    const idCard = {
      number,
      titleId,
      firstName,
      lastName,
      maritalStatusId,
      currentAddress,
      idCardAddress,
      idCardPhoto: imagePath,
    };
    const isAffected = await repo.user.addIdCard(ctx.db, userId, idCard);
    if (!isAffected) {
      ctx.status = 400;
      throw new Error('Insert or update failed');
    }
    ctx.body = {};
  } catch (error) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function insertBank(ctx) {
  const userId = ctx.params.id;
  const profileBankPhotoDest = `${profileDir}${userId}/`;
  let imagePath;
  try {
    imagePath = await uploadPhoto(ctx.request.body.files.bookPhoto, profileBankPhotoDest, 'bank-proof');
    const {
      bankId,
      branch,
      accountNo,
    } = ctx.request.body.fields;
    const bank = {
      bankId,
      branch,
      accountNo,
      bookPhoto: imagePath,
    };
    const isAffected = await repo.user.addBank(ctx.db, userId, bank);
    if (!isAffected) {
      ctx.status = 400;
      throw new Error('Insert or update failed');
    }
    ctx.body = {};
  } catch (error) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function forgetPassword(ctx) {
  const user = ctx.request.body;
  const matchEmail = await repo.user.findByEmailGetPassword(ctx.db, user.email);
  const tokenNumber = randtoken.generate(16);
  if (!matchEmail) {
    ctx.status = 400;
    ctx.body = { error: 'email is not found.' };
    return;
  }
  ctx.body = { token: tokenNumber };
}

async function editEducation(ctx) {
  const userId = ctx.params.id;
  const { eduId } = ctx.params;
  const profileEducationPhotoDest = `${profileDir}${userId}/education/`;
  let imagePath;
  try {
    imagePath = await uploadPhoto(ctx.request.body.files.educationPhoto, profileEducationPhotoDest);
    const oldEdu = await repo.user.findEduById(ctx.db, eduId);
    if (!oldEdu) {
      ctx.status = 400;
      throw new Error('education not found');
    }
    const {
      university,
      facility,
      degree,
    } = ctx.request.body.fields;
    const edu = {
      university,
      facility,
      degree,
      educationPhoto: imagePath,
    };
    const isAffected = await repo.user.updateEducation(ctx.db, eduId, edu);
    if (!isAffected) {
      ctx.status = 400;
      throw new Error('update education failed');
    }
    deleteFile(oldEdu.educationPhoto);
    ctx.body = {};
  } catch (error) {
    deleteFile(imagePath);
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
}

async function editExperience(ctx) {
  const { expId } = ctx.params;
  const isAffected = await repo.user.updateExperience(ctx.db, expId, ctx.request.body);
  if (!isAffected) {
    ctx.status = 400;
    ctx.body = { error: 'edit skill failed' };
    return;
  }
  ctx.body = {};
}

async function editSkill(ctx) {
  const { skillId } = ctx.params;
  const isAffected = await repo.user.updateSkill(ctx.db, skillId, ctx.request.body);
  if (!isAffected) {
    ctx.status = 400;
    ctx.body = { error: 'edit skill failed' };
    return;
  }
  ctx.body = {};
}

async function deleteEducation(ctx) {
  const { eduId } = ctx.params;
  const edu = await repo.user.findEduById(ctx.db, eduId);
  if (edu) {
    await repo.user.deleteEducation(ctx.db, eduId);
    deleteFile(edu.educationPhoto);
  }
  ctx.body = {};
}

async function deleteExperience(ctx) {
  await repo.user.deleteExperience(ctx.db, ctx.params.expId);
  ctx.body = {};
}

async function deleteSkill(ctx) {
  await repo.user.deleteSkill(ctx.db, ctx.params.skillId);
  ctx.body = {};
}

module.exports = {
  forgetPassword,
  getProfile,
  insertEducation,
  insertExperience,
  insertSkills,
  insertIdCard,
  insertBank,
  updateProfilePhoto,
  editProfile,
  editPassword,
  editBasicProfile,
  editSkill,
  editEducation,
  editExperience,
  deleteEducation,
  deleteExperience,
  deleteSkill,
};
