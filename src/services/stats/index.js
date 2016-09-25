const db = require('../../../data')
const extend = require('lodash/fp/extend')
const timeSeries = require('../../lib/time-series')
const percentage = require('../../lib/percentage')

module.exports = function () {
  const app = this
  const serviceObject = {
    setup: function (app) {
      this.app = app
    }, 

    find: function (params, callback) {
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

  app.use('api/v1/stats', serviceObject)
}

