const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')
const once = require('pull-stream/sources/once')
const flatten = require('pull-stream/throughs/flatten')
const delay = require('pull-delay')

const app = require('../../../app')
const getJob = require('../../../lib/get-job')
  
const jobService = app.service('jobs')

pull(
  once({ text: null }),
  asyncMap(jobService.where),
  flatten(),
  delay(500),
  asyncMap((row, cb) => {
    getJob(row.url, cb)
  }),
  asyncMap(jobService.updateCb),
  map(r => {
    console.log(r)
    return r
  }),
  onEnd(() => {
    console.log('done')
  })
)

