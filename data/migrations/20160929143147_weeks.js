exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('weeks', table => {
    table.string('week_term').primary()
    table.date('week')
    table.string('term')
    table.float('percentage_of_jobs')
    table.float('frequency')
    table.integer('total_mentions')
    table.integer('total_jobs')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weeks')
}
