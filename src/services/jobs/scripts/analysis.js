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
const app = require('../../app')
const jobDb = require('./jobs-db')
// TODO transform to termDb
const termService = app.service('terms')

pull(
  once('listing_date'),
  asyncMap(jobDb.whereNotNull),
  flatten(),
  pullMap(job => {
    const ngrams = gramophone.extract(
      job.text, 
      { score: true, min: 2, ngrams: [2, 3] }
    )
    const terms = gramophone.extract(
      job.text, 
      { score: true, min: 1, ngrams: 1 }
    )
    const length = job.text.replace(/\n/g, ' ').split(' ').length

    return map(term => ({
      term: term.term,
      job_url: job.url,
      document_frequency: term.tf,
      per_1000_frequency: term.tf / length * 1000
    }))(concat(ngrams, terms))
  }),
  flatten(),
  asyncMap(termService.createCb),
  onEnd(() => {
    console.log('done')
  })
)
