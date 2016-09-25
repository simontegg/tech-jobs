'use strict';
const testData = require('../../../data/test-data/jobs')
const app = require('../../../src/app')
const db = require('../../../data')
const test = require('ava')

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

test.cb('jobService.exist() returns true for existing test data', t => {
  const d = testData[0]
  const jobsService = app.service('jobs')
  jobsService.exist(d.url, (err, job) => {
    t.is(job.url, d.url)
    t.true(job.exist)
    t.end()
  })
})

test.cb('jobService.createCb() adds', t => {
  const goog = { url: 'http://google.com' }

  const jobsService = app.service('jobs')
  jobsService.createCb(goog, (err, job) => {
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
