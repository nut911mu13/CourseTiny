// const moment = require('moment');

async function get(db, id) {
  const [row] = await db.query(`
    SELECT
      id,
      email,
      first_name AS firstName,
      last_name AS lastName,
      mobile_number AS mobileNumber,
      vat,
      total_price_vat_incl AS totalPriceVatIncl,
      total_price_vat_excl AS totalPriceVatExcl,
      total_quantity AS totalQuantity,
      user_id AS userId,
      course_id AS courseId,
      order_status_id AS orderStatusId,
      created_at AS createdAt,
      expired_at AS expiredAt,
      title,
      cover,
      start_date AS startDate,
      end_date AS endDate,
      location
    FROM
      order_details
    WHERE
      id = ?
  `, [id]);
  return row;
}

async function getExpire(db, id) {
  const [row] = await db.query(`
    SELECT
      expired_at AS expiredAt
    FROM
      orders
    WHERE
      id = ?
  `, [id]);
  return row.expiredAt;
}

async function getTicketsByOrderId(db, id) {
  const row = await db.query(`
  SELECT
    ct.id,
    ct.name,
    ct.price,
    tmp.orderTicketId
  FROM
    course_tickets ct
  JOIN
    (SELECT
    course_ticket_id AS courseTicketId,
    GROUP_CONCAT(id) AS orderTicketId
    FROM
      order_tickets
    WHERE
      order_id = ?
    GROUP BY course_ticket_id) tmp ON ct.id = tmp.courseTicketId
  `, [id]);
  return row;
}

async function store(db, userId, order) {
  const result = await db.query(
    `
      INSERT INTO
        orders
        (
          vat,
          total_price_vat_incl,
          total_price_vat_excl,
          total_quantity,
          course_id,
          order_status_id,
          created_at,
          expired_at,
          user_id
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [order.vat,
      order.totalPriceVatIncl,
      order.totalPriceVatExcl,
      order.totalQuantity,
      order.courseId,
      1,
      order.createdAt,
      order.expiredAt,
      userId],
  );
  return result.insertId;
}

async function update(db, id, order) {
  const result = await db.query(
    `
      UPDATE
        orders
      SET
        email = ?,
        first_name = ?,
        last_name = ?,
        mobile_number = ?,
        order_status_id = ?
      WHERE
        id = ?
    `,
    [order.email,
      order.firstName,
      order.lastName,
      order.mobileNumber,
      order.status,
      id],
  );
  return result.affectedRows;
}

async function updateTicket(db, id, ticket) {
  const result = await db.query(
    `
      UPDATE
        order_tickets
      SET
        email = ?,
        first_name = ?,
        last_name = ?,
        mobile_number = ?
      WHERE
        id = ?
    `,
    [ticket.email,
      ticket.firstName,
      ticket.lastName,
      ticket.mobileNumber,
      id],
  );
  return result.affectedRows;
}

async function addTicket(db, orderId, courseTicketId, price) {
  const result = await db.query(
    `
      INSERT INTO
        order_tickets
        (
          order_id,
          course_ticket_id,
          price
        )
      VALUES
        (?, ?, ?)
    `,
    [orderId,
      courseTicketId,
      price],
  );
  return result.insertId;
}

async function getRemainingTicket(db, id) {
  const queryParamsCount = new Array(id.length).fill('?').join();
  const rows = await db.query(
    `
    SELECT
      id,
      name,
      course_id AS courseId,
      quantity,
      price,
      reserved_ticket_count AS reservedTicketCount,
      remaining
    FROM
      order_ticket_quantity
    WHERE id IN (${queryParamsCount})
    `,
    [...id],
  );
  return rows;
}

async function addPayment(db, payment) {
  const result = await db.query(
    `
    INSERT INTO
      order_payment
      (
        order_id,
        proof_image,
        payment_method,
        transfer_date,
        bank_id
      )
    VALUES
      (?, ?, ?, ?, ?)
    ON DUPLICATE KEY
    UPDATE
      order_id = ?,
      proof_image = ?,
      payment_method = ?,
      transfer_date = ?,
      bank_id = ?
    `,
    [payment.orderId,
      payment.cover,
      payment.paymentMethod,
      payment.transferDate,
      payment.bankId,
      payment.orderId,
      payment.cover,
      payment.paymentMethod,
      payment.transferDate,
      payment.bankId],
  );
  return result.affectedRows;
}

async function getOrderByUserId(db, id) {
  const rows = await db.query(
    `
    SELECT
      o.id,
      c.title,
      o.created_at AS date,
      o.expired_at AS expire,
      o.total_quantity AS quantity,
      o.total_price_vat_excl AS total,
      o.order_status_id AS status
    FROM
      orders o
    INNER JOIN
      courses c
    ON c.id = o.course_id
    WHERE
      o.user_id = ?
    `,
    [id],
  );
  return rows;
}

async function checkRoleById(db, userId) {
  const [row] = await db.query(
    `
      SELECT
        role_id AS roleId
      FROM
        users
      WHERE
       id = ?
    `,
    [userId],
  );
  if (!row) {
    return;
  }
  return row.roleId;
}

async function remove(db, id) {
  const result = await db.query(
    `
      DELETE FROM
        orders
      WHERE id = ?
    `,
    [id],
  );
  return result.affectedRows;
}

module.exports = {
  get,
  store,
  update,
  updateTicket,
  addTicket,
  addPayment,
  getRemainingTicket,
  getOrderByUserId,
  getTicketsByOrderId,
  getExpire,
  remove,
  checkRoleById,
};
