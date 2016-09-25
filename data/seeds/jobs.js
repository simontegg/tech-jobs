 const testData = require('../test-data/jobs') 

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      return knex('jobs').insert(testData)
    })
}
