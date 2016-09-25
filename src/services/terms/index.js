const db = require('../../../data')
const service = require('feathers-knex')
const extend = require('lodash/fp/extend')

module.exports = function () {
  const app = this

  const options = {
    Model: db,
    name: 'terms',
    id: 'url'
  }

  const serviceObject = extend(service(options), {

    db: () => db('terms'),

    whereSelect: (params, callback) => {
      db('terms')
        .select(params.rows || '*')
        .where(params.query || {})
        .asCallback(callback)
    },

    whereNotNull: (column, callback) => {
      db('terms')
        .whereNotNull(column)
        .asCallback(callback)
    },

    where: (query, callback) => {
      db('terms')
        .select()
        .where(query)
        .asCallback(callback)
    },

    get: (term, callback) => {
      db('terms')
        .select()
        .where('term', term)
        .asCallback((err, rows) => {
          if (err) callback(err)
          else callback(null, rows[0])
        })
    },

    createCb: (term, callback) => {
      db('terms')
        .insert(term)
        .asCallback(callback)
    },

    updateCb: (term, callback) => {
      db('terms')
        .where('url', job.url)
        .update(job)
        .asCallback(callback)
    }


  })


  // Initialize our service with any options it requires
  app.use('/terms', serviceObject)

  // Get our initialize service to that we can bind hooks
  const termsService = app.service('/jobs');

}
