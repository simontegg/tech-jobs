// pull streams
const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const onEnd = require('pull-stream/sinks/on-end')
const once = require('pull-stream/sources/once')
const flatten = require('pull-stream/throughs/flatten')
const delay = require('pull-delay')

// modules
const moment = require('moment')

// local
const getJob = require('../lib/get-job')
const jobsDb = require('./jobs-db')

module.exports = function (callback) {
  pull(
    once({ text: null }),
    asyncMap(jobsDb.where),
    flatten(),
    delay(500),
    asyncMap((row, cb) => {
      getJob(row.url, cb)
    }),
    map(job => {
      job.listing_date = moment(job.listing_date, 'DD MMM YYYY')
      .format('YYYY-MM-DD')
      return job
    }),
    asyncMap(jobsDb.updateCb),
    onEnd(callback)
  )
}

