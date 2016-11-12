// pull streams
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const onEnd = require('pull-stream/sinks/on-end')
const once = require('pull-stream/sources/once')
const flatten = require('pull-stream/throughs/flatten')

// modules
const gramophone = require('gramophone')
const concat = require('lodash/fp/concat')
const map = require('lodash/fp/map')

// local
const jobDb = require('./jobs-db')
const termDb = require('./terms-db')

module.exports = function (callback) {
  console.log('indexByTerm')
  pull(
    once('indexed'),
    asyncMap(jobDb.whereNull),
    flatten(),
    asyncMap((job, cb) => {
      job.indexed = true
      jobDb.updateCb(job, (err, updates) => {
        console.log('indexed', job)
        cb(null, job)
      })
    }),
    pullMap((job) => {
      return map((term) => ({
        term: term.term,
        job_url: job.url,
        document_frequency: term.tf,
        per_1000_frequency: term.tf / textLength(job.text) * 1000
      }))(termsAndNgrams(job.text))
    }),
    flatten(),
    asyncMap(termDb.createCb),
    onEnd(callback)
  )
}

function textLength (text) {
  return text.replace(/\n/g, ' ').split(' ').length
}

function termsAndNgrams (text) {
  return concat(
    gramophone.extract(text, { score: true, min: 2, ngrams: [2, 3] }),
    gramophone.extract(text, { score: true, min: 1, ngrams: 1 })
  )
}
