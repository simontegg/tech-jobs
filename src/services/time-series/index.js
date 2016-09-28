const db = require('../../../data')
const extend = require('lodash/fp/extend')
const timeSeries = require('../../lib/time-series')
const percentage = require('../../lib/percentage')
// pull streams
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')

module.exports = function () {
  const app = this
  const serviceObject = {
    setup: function (app) {
      this.app = app
    }, 

    // TODO rewrite to query the 'months' and 'weeks' table
    find: function (params, callback) {
      console.log(db)
      const termService = this.app.service('terms') 
      const end = parseInt(new Date().getTime() / 1000)
      let counts
      return db('terms')
        .join('jobs', 'job_url', '=', 'url')
        .where(params.query)
        .select()
        .then(terms => {
          counts = timeSeries(terms, 'listing_date', params.query.term, end)
          return db('jobs')
            .select()
        })
        .then(jobs => {
          return percentage(
            timeSeries(jobs, 'listing_date', 'all', end),
            counts
          )
        })
    }
      
  }

  app.use('api/v1/time-series', serviceObject)
}

function queryTermsJobs (params, callback) {
  db('terms')
    .join('jobs', 'job_url', '=', 'url')
    .where(params.query)
    .select()
    .asCallback(callback)
}

