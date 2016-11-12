// main
const Url = require('url')
const map = require('lodash/fp/map')

// pull streams
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')

// local
const seekUrlConfig = require('./seek-url-config')
const jobDb = require('./jobs-db')
const seek = require('./seek')

module.exports = recurseSeek

function recurseSeek (searchTerms, page, done) {
  seek(generateURL(searchTerms, page), (err, result) => {
    console.log(result)
    insertJob(result.links, result.next, searchTerms, done)
  })
}

function keywords (searchTerms) {
  return map(term => term.replace(' ', '+'))(searchTerms).join('%2C+')
}

function generateURL (searchTerms, page) {
  return `${Url.format(seekUrlConfig)}&keywords=${keywords(searchTerms)}&page=${page}`
}

function insertJob (links, next, searchTerms, done) {
  console.log('insertJob')
  pull(
    values(links),
    pullMap((link) => link.url),
    asyncMap(jobDb.exist),
    filter((job) => !job.exist),
    pullMap((job) => { delete job.exist; return job }), 
    asyncMap(jobDb.createCb),
    onEnd(() => {
      if (next) {
        console.log('do next')
        recurseSeek(searchTerms, next, done) 
      } else {
        done(null)
      }
    })
  )
}
