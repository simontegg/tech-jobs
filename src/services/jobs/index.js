'use strict'
const db = require('../../../data')
const service = require('feathers-knex')
const hooks = require('./hooks')
const extend = require('lodash/fp/extend')

module.exports = function () {
  const app = this

  const options = {
    Model: db,
    name: 'jobs',
    id: 'url'
  }

  const serviceObject = extend(service(options), {

    db: () => db('jobs'),

    whereSelect: (params, callback) => {
      db('jobs')
        .select(params.rows || '*')
        .where(params.query || {})
        .asCallback(callback)
    },

    whereNotNull: (column, callback) => {
      db('jobs')
        .whereNotNull(column)
        .asCallback(callback)
    },

    where: (query, callback) => {
      db('jobs')
        .select()
        .where(query)
        .asCallback(callback)
    },

    get: (url, callback) => {
      db('jobs')
        .select()
        .where('url', url)
        .asCallback((err, rows) => {
          if (err) callback(err)
          else callback(null, rows[0])
        })
    },

    exist: (job, callback) => {
      db('jobs')
        .select()
        .where('url', job.url)
        .asCallback((err, rows) => {
          if (err) callback(err)
          else callback(null, { url: job.url, exist: rows.length !== 0 })
        })
    },

    createCb: (job, callback) => {
      db('jobs')
        .insert(job, 'url')
        .asCallback(callback)
    },

    updateCb: (job, callback) => {
      db('jobs')
        .where('url', job.url)
        .update(job)
        .asCallback(callback)
    }


  })


  // Initialize our service with any options it requires
  app.use('/jobs', serviceObject)

  // Get our initialize service to that we can bind hooks
  const jobsService = app.service('/jobs');

  // Set up our before hooks
  jobsService.before(hooks.before);

  // Set up our after hooks
  jobsService.after(hooks.after);
}
