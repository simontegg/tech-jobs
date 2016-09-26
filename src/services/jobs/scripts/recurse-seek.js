// main
const Url = require('url')
const co = require('co')
const map = require('lodash/fp/map')

// pull streams
const seekUrlConfig = require('./seek-url-config')
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')

// local
const jobDB = require('./jobs-db')
const seek = require('./seek')

module.exports = function recurseSeek (searchTerms, page) {
  co(function* () {
    const result = yield seek(generateURL(searchTerms, page))

    pull(
      values(result.links),
      asyncMap(jobDb.exist),
      filter(job => !job.exist),
      pullMap(job => { delete job.exist; return job }),
      asyncMap(jobDb.createCb),
      onEnd(() => {
        if (result.next) {
          recurseSeek(searchTerms, result.next) 
        }
      })
    )
  })
}

function keywords (searchTerms) {
  return map(term => term.replace(' ', '+'))(searchTerms).join('%2C+')
}

function generateURL (searchTerms, page) {
  return `${Url.format(seekUrlConfig)}&keywords=${keywords(searchTerms)}&page=${page}`
}


