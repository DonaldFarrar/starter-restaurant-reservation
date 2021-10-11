const knex = require("../db/connection");

const tableName = "tables";
const reservName = "reservations";

//creates a table to be seated
function create(table) {
  //console.log("table =====>", table);
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

function readTable(tableId) {
  return knex(tableName).select("*").where({ table_id: tableId }).first();
}

//updates the table being sat with the current reservation
function update(reservationId, tableId) {
  return knex(reservName)
    .where({ reservation_id: reservationId })
    .update({ status: "seated" })
    .then(() => {
      return knex(tableName)
        .where({ table_id: tableId })
        .update({ reservation_id: reservationId })
        .returning("*");
    });
}

function list() {
  return knex(tableName).returning("*").orderBy("table_name");
}

function clearTable(tableId, reservationId) {
  return knex(reservName)
    .where({ reservation_id: reservationId })
    .update({ status: "finished" })
    .returning("*")
    .then(() => {
      return knex(tableName)
        .where({ table_id: tableId })
        .update({ reservation_id: null })
        .then(() => readTable(tableId));
    });
}

module.exports = {
  create,
  update,
  list,
  readTable,
  clearTable,
};
