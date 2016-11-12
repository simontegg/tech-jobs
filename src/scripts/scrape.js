const searchTerms = ['web developer'] 

// pull streams
const pull = require('pull-stream/pull')
const once = require('pull-stream/sources/once')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const drain = require('pull-stream/sinks/drain')

const recurseSeek = require('./recurse-seek')
const getJobDetails = require('./get-job-details')
const indexByTerm = require('./index-by-term')
const termJobPrevalence = require('./term-job-prevalance')

const later = require('later')

const schedule = later.parse.recur().on(12).hour()

const t = later.setInterval(scrape, schedule)



//scrape()

function scrape () {
  console.log('begin scrape')
  pull(
    once(1),
    asyncMap((page, cb) => {
      console.log('recurseSeek', page)
      recurseSeek(searchTerms, page, cb)
    }),
    asyncMap((n, cb) => {
      getJobDetails(cb) 
    }),
    asyncMap((n, cb) => {
      console.log('indexByTerm')
      indexByTerm(cb) 
    }),
    asyncMap((n, cb) => {
      termJobPrevalence('month', cb)
    }),
    asyncMap((n, cb) => {
      termJobPrevalence('week', cb)
    }),
    drain()
  )
}


