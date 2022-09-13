const knex = require("../db/connection")

function list() {
    return knex("tables")
        .select("*")
        .orderBy("table_name")
}

function read(table_id) {
    return knex("tables")
        .select("*")
        .where({ table_id })
        .first();
}

function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then(createdRecords => createdRecords[0])
}

function update(updatedTable) {
    return knex("tables")
        .select("*")
        .where({ table_id: updatedTable.table_id })
        .update(updatedTable)
        .then(() => read(updatedTable.table_id))

}

module.exports = {
    list,
    read,
    create,
    update
}