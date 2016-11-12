
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('jobs', table => {
    table.string('url').primary()
    table.date('listing_date')
    table.string('heading')
    table.string('text')
    table.integer('text_length')
    table.string('location')
    table.integer('salary_min')
    table.integer('salary_max')
    table.boolean('indexed')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs')
}
