exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('terms', table => {
    table.string('job_url')
    table.string('term')
    table.integer('document_frequency')
    table.float('per_1000_frequency')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('terms')
}
