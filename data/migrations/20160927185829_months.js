exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('months', table => {
    table.string('month_term').primary()
    table.date('month')
    table.string('term')
    table.float('percentage_of_jobs')
    table.float('frequency')
    table.integer('total_mentions')
    table.integer('total_jobs')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('months')
}
