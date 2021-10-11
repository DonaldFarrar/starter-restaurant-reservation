const knex = require("../db/connection");

const reservName = "reservations";

const list = (date, mobile_number) => {
  // if a date argument was passed in, we apply that search restriction
  if (date) {
    return knex(reservName)
      .select("*")
      .where({ reservation_date: date })
      .orderBy("reservation_time");
  }
  if (mobile_number) {
    return knex(reservName)
      .select("*")
      .where("mobile_number", "like", `${mobile_number}%`);
  }
  // otherwise, just return all the reservations
  return knex(reservName).select("*");
};

const read = (reservation_id) => {
  return knex(reservName)
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
};

const create = (reservation) => {
  return knex(reservName).insert(reservation).returning("*");
};

function update(reservation_id, status) {
  return knex(reservName)
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

function edit(reservation_id, reservation) {
  return knex(reservName)
    .where({ reservation_id: reservation_id })
    .update({ ...reservation })
    .returning("*");
}

module.exports = {
  list,
  create,
  read,
  update,
  edit,
};
