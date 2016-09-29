const testData = require('../../../data/test-data/jobs')
console.log('testData', testData)
const app = require('../../../src/app')
const db = require('../../../data')
const test = require('ava')
const jobDb = require('../../../src/services/jobs/scripts/jobs-db')

test.beforeEach(t => {
 return db.migrate.latest()
  .then(() => {
    console.log('seeding')
    return db.seed.run()
  })
})

test.afterEach.always(t => {
  console.log('rollback')
  return db.migrate.rollback()
})

test.cb('jobDb.exist() returns true for existing test data', t => {
  const d = testData[0]
  jobDb.exist(d.url, (err, job) => {
    t.is(job.url, d.url)
    t.true(job.exist)
    t.end()
  })
})

test.cb('jobService.createCb() adds', t => {
  const goog = { url: 'http://google.com' }

  jobDb.createCb(goog, (err, job) => {
    db('jobs')
        .select()
        .where('url', goog.url)
        .asCallback((err, rows) => {
          console.log('rows', rows)
        t.is(goog.url, rows[0].url)
        t.end()
      })

  })
})
