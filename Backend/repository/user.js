async function getUserProfile(db, id) {
  // set session max len to prevent data loss
  await db.query('SET SESSION group_concat_max_len = 1000000');
  const [row] = await db.query(
    `
    SELECT
      id,
      email,
      username,
      first_name AS firstName,
      last_name AS lastName,
      birthday,
      sex,
      mobile_number AS mobileNumber,
      profile_photo AS profilePhoto,
      about_me AS aboutMe,
      website,
      active,
      education,
      experience,
      skills,
      id_card_number AS idCardNumber,
      id_card_title_id AS idCardTitle,
      id_card_first_name AS idCardFirstName,
      id_card_last_name AS idCardLastName,
      id_card_marital_status_id AS idCardMaritalStatusId,
      id_card_current_address AS idCardCurrentAddress,
      id_card_address AS idCardAddress,
      id_card_photo AS idCardPhoto,
      bank_id AS bankId,
      branch,
      account_no AS accountNo,
      book_photo AS bookPhoto
    FROM
      user_profile
    WHERE
      id = ?
    `,
    [id],
  );
  return row;
}

async function store(db, user) {
  const result = await db.query(
    `
    INSERT INTO
      users (
        email,
        password,
        first_name,
        last_name,
        mobile_number,
        sex, birthday,
        profile_photo,
        role_id
      )
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [user.email,
      user.password,
      user.firstName,
      user.lastName,
      user.mobileNumber,
      user.sex,
      user.birthday,
      user.profilePhoto,
      1],
  );
  return result.insertId;
}

async function findByEmailGetPassword(db, email) {
  const [row] = await db.query(
    `
    SELECT
      id,
      email,
      password,
      first_name,
      last_name,
      mobile_number,
      sex
    FROM users
    WHERE email = ?
    `,
    [email],
  );
  return row;
}

async function findByEmail(db, email) {
  const [row] = await db.query(
    `
    SELECT
      id,
      email,
      password,
      first_name,
      last_name,
      mobile_number,
      profile_photo AS profilePhoto,
      sex
    FROM
      users
    WHERE
      (email = ?)
    `,
    [email],
  );
  return row;
}

async function findById(db, id) {
  const [row] = await db.query(
    `
    SELECT
      id,
      email,
      password,
      username,
      first_name,
      last_name,
      birthday,
      sex,
      mobile_number,
      profile_photo AS profilePhoto
    FROM
      users
    WHERE
      id = ?
  `,
    [id],
  );
  return row;
}

async function addEducation(db, userId, edu) {
  const result = await db.query(
    `
    INSERT INTO
      user_education (
        university,
        facility,
        degree,
        education_photo,
        user_id
      )
    VALUES
      (?, ?, ?, ?, ?)
    `,
    [edu.university,
      edu.facility,
      edu.degree,
      edu.educationPhoto,
      userId],
  );
  return result.insertId;
}

async function addExperience(db, userId, exp) {
  const result = await db.query(
    `
    INSERT INTO
      user_experience (
        company,
        position,
        startMonth,
        startYear,
        endMonth,
        endYear,
        is_current,
        user_id
      )
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [exp.company,
      exp.position,
      +exp.startMonth,
      +exp.startYear,
      exp.isCurrent ? null : +exp.endMonth,
      exp.isCurrent ? null : +exp.endYear,
      +exp.isCurrent,
      userId],
  );
  return result.insertId;
}

async function addSkill(db, userId, skill) {
  const result = await db.query(
    `
    INSERT INTO
      user_skills (
        name,
        level,
        user_id
      )
      VALUES
        (?, ?, ?)
    `,
    [skill.name,
      skill.level,
      userId],
  );
  return result.insertId;
}

async function addIdCard(db, userId, idCard) {
  const result = await db.query(
    `
    INSERT INTO
      user_id_card  (
        user_id,
        number,
        title_id,
        first_name,
        last_name,
        marital_status_id,
        current_address,
        id_card_address,
        id_card_photo
      )
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY
      UPDATE
        number = ?,
        title_id = ?,
        first_name = ?,
        last_name = ?,
        marital_status_id = ?,
        current_address = ?,
        id_card_address = ?,
        id_card_photo = ?
    `,
    [userId,
      idCard.number,
      +idCard.titleId,
      idCard.firstName,
      idCard.lastName,
      +idCard.maritalStatusId,
      idCard.currentAddress,
      idCard.idCardAddress,
      idCard.idCardPhoto,
      idCard.number,
      +idCard.titleId,
      idCard.firstName,
      idCard.lastName,
      +idCard.maritalStatusId,
      idCard.currentAddress,
      idCard.idCardAddress,
      idCard.idCardPhoto],
  );
  return result.affectedRows;
}

async function addBank(db, userId, bank) {
  const result = await db.query(
    `
    INSERT INTO
      user_bank
        (
          user_id,
          bank_id,
          branch,
          account_no,
          book_photo
        )
        VALUES
        (?, ?, ?, ?, ?)
    ON DUPLICATE KEY
      UPDATE
        bank_id = ?,
        branch = ?,
        account_no = ?,
        book_photo = ?
    `,
    [userId,
      bank.bankId,
      bank.branch,
      bank.accountNo,
      bank.bookPhoto,
      bank.bankId,
      bank.branch,
      bank.accountNo,
      bank.bookPhoto],
  );
  return result.affectedRows;
}

async function updateProfile(db, userId, profile) {
  const result = await db.query(
    `
    UPDATE
      users
    SET
      username = ?,
      first_name = ?,
      last_name = ?,
      birthday = ?,
      sex = ?,
      mobile_number = ?
    WHERE
      id = ?
    `,
    [profile.username,
      profile.firstName,
      profile.lastName,
      profile.birthday,
      profile.sex,
      profile.mobileNumber,
      userId],
  );
  return result.affectedRows;
}

async function updatePassword(db, userId, password) {
  const result = await db.query(
    `
      UPDATE
        users
      SET
        password = ?
      WHERE
        id = ?
    `,
    [password,
      userId],
  );
  return result.affectedRows;
}

async function updateBasicProfile(db, userId, profile) {
  const result = await db.query(
    `
      UPDATE
        users
      SET
        about_me = ?,
        website = ?
      WHERE
        id = ?
    `,
    [profile.aboutMe,
      profile.website,
      userId],
  );
  return result.affectedRows;
}

async function updateProfilePhoto(db, userId, imagePath) {
  const result = await db.query(
    `
      UPDATE
        users
      SET
        profile_photo = ?
      WHERE
        id = ?
    `,
    [imagePath,
      userId],
  );
  return result.affectedRows;
}

async function updateEducation(db, eduId, edu) {
  const result = await db.query(
    `
    UPDATE
      user_education
    SET
      university = ?,
      facility = ?,
      degree = ?,
      education_photo = ?
    WHERE
      id = ?
    `,
    [edu.university,
      edu.facility,
      edu.degree,
      edu.educationPhoto,
      eduId],
  );
  return result.affectedRows;
}

async function updateExperience(db, expId, exp) {
  const result = await db.query(
    `
    UPDATE
      user_experience
    SET
      company = ?,
      position = ?,
      startMonth = ?,
      startYear = ?,
      endMonth = ?,
      endYear = ?,
      is_current = ?
    WHERE
      id = ?
    `,
    [exp.company,
      exp.position,
      exp.startMonth,
      exp.startYear,
      !exp.endMonth ? null : exp.endMonth,
      !exp.endYear ? null : exp.endYear,
      exp.isCurrent,
      expId],
  );
  return result.affectedRows;
}

async function updateSkill(db, skillId, skill) {
  const result = await db.query(
    `
      UPDATE
        user_skills
      SET
        name = ?,
        level = ?
      WHERE
        id = ?
    `,
    [skill.name,
      skill.level,
      skillId],
  );
  return result.affectedRows;
}

async function deleteEducation(db, eduId) {
  const result = await db.query(
    `
    DELETE FROM user_education WHERE id = ?
    `,
    [eduId],
  );
  return result.affectedRows;
}

async function deleteExperience(db, expId) {
  const result = await db.query(
    `
    DELETE FROM user_experience WHERE id = ?
    `,
    [expId],
  );
  return result.affectedRows;
}

async function deleteSkill(db, skillId) {
  const result = await db.query(
    `
    DELETE FROM user_skills WHERE id = ?
    `,
    [skillId],
  );
  return result.affectedRows;
}

async function findEduById(db, id) {
  const [row] = await db.query(
    `
    SELECT
      id,
      university,
      facility,
      degree,
      education_photo AS educationPhoto,
      user_id
    FROM
      user_education
    WHERE
      id = ?
    `,
    [id],
  );
  return row;
}

async function getNameTitle(db) {
  const rows = await db.query(`
    SELECT
      id, en, th
    FROM
      name_titles
    `);
  return rows;
}

async function getMaritalStatus(db) {
  const rows = await db.query(`
    SELECT
      id, en, th
    FROM
      marital_status
    `);
  return rows;
}

module.exports = {
  getUserProfile,
  getNameTitle,
  getMaritalStatus,
  store,
  addEducation,
  addExperience,
  addSkill,
  addIdCard,
  addBank,
  updateProfilePhoto,
  updateProfile,
  updatePassword,
  updateBasicProfile,
  updateSkill,
  updateEducation,
  updateExperience,
  deleteEducation,
  deleteExperience,
  deleteSkill,
  findById,
  findEduById,
  findByEmail,
  findByEmailGetPassword,
  // findByEmailSelfInfo,
};
