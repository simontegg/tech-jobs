
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('related_terms', table => {
    table.string('term')
    table.string('synonym')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('related_terms')
}
