async function store(db, course, id) {
  const result = await db.query(
    `
      INSERT INTO
        courses
        (
          title,
          cover,
          start_date,
          end_date,
          location,
          description,
          user_id,
          category_id,
          course_status_id
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [course.title,
      course.cover,
      course.startDate,
      course.endDate,
      course.location,
      course.description,
      id,
      course.category,
      1],
  );
  const { insertId } = result;
  if (!insertId) {
    throw new Error('no insertId');
  }
  return insertId;
}

async function insertTicket(db, course, courseId) {
  const result = await db.query(
    `
    INSERT INTO
      course_tickets
      (
        name,
        detail,
        start_date,
        end_date,
        quantity,
        price,
        course_id
      )
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
    `,
    [course.name,
      course.detail,
      course.startDate,
      course.endDate,
      course.quantity,
      course.price,
      courseId],
  );
  const { insertId } = result;
  if (!insertId) {
    throw new Error('no insertId');
  }
  return insertId;
}

async function updateCourse(db, course, id, editTitle) {
  const result = await db.query(
    `
    UPDATE
      courses
    SET
      title = ?,
      cover = ?,
      start_date = ?,
      end_date = ?,
      location = ?,
      description = ?
    WHERE
      (user_id = ?)
      and
      (title = ?)
    `,
    [course.title,
      course.cover,
      course.startDate,
      course.endDate,
      course.location,
      course.description,
      id,
      editTitle],
  );
  // console.log(id, editTitle);
  const { affectedRows } = result;
  if (!affectedRows) {
    throw new Error('no affectedRows');
  }
  return affectedRows;
}

async function listCategories(db) {
  const rows = await db.query(`
    SELECT
      id,
      en,
      th
    FROM
      categories
  `);
  return rows;
}

async function coursesByUser(db, user) {
  const [result] = await db.query(
    `
    SELECT
    id,
    title,
    cover,
    start_date startDate,
    end_date endDate,
    location,
    description,
    course_status_id courseStatusId
    FROM
      courses c
    WHERE
      user_id = ?
    `,
    [user.id],
  );
  return result;
}

async function list(db) {
  const rows = await db.query(`
    SELECT
      id,
      title,
      cover,
      start_date AS startDate,
      end_date AS endDate,
      location,
      description,
      category_id AS categoryId
    FROM
      courses
  `);
  return rows;
}

async function findById(db, id) {
  const [row] = await db.query(
    `
    SELECT
      id,
      title,
      cover,
      start_date AS startDate,
      end_date AS endDate,
      location,
      description
    FROM
      course_details
    WHERE
      id = ?
    `,
    [id],
  );
  return row;
}

async function findByTitle(db, title) {
  // set session max len to prevent data loss
  await db.query('SET SESSION group_concat_max_len = 1000000');
  const [row] = await db.query(
    `
    SELECT
      id,
      title,
      cover,
      start_date AS startDate,
      end_date AS endDate,
      location,
      description,
      tickets,
      user
    FROM
    course_details
    WHERE
    title = ?
    `,
    [title],
  );
  return row;
}

async function getRemainingTicketByCourseId(db, id) {
  const rows = await db.query(
    `
    SELECT
      id,
      name,
      price,
      quantity,
      remaining
    FROM
      order_ticket_quantity
    WHERE
      course_id = ?
    `,
    [id],
  );
  return rows;
}

module.exports = {
  store,
  insertTicket,
  updateCourse,
  listCategories,
  coursesByUser,
  list,
  findByTitle,
  findById,
  getRemainingTicketByCourseId,
};
