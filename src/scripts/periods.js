const db = require('../../data')

// pull streams
const pull = require('pull-stream/pull')
const map = require('pull-stream/throughs/map')
const count = require('pull-stream/sources/count')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')
const once = require('pull-stream/sources/once')
const flatten = require('pull-stream/throughs/flatten')
const delay = require('pull-delay')

const _ = require('lodash')
const moment = require('moment')
require('moment-range')

function termCountsPerPeriod (period, callback) {
  const format = period === 'month' ? "'%Y-%m'" : "'%Y-%W'"
  db.raw(
    `select count(distinct job_url) as total_jobs, 
    strftime(${format}, listing_date) as ${period}, 
    sum(document_frequency) as total_mentions,
    term from terms 
    inner join jobs on terms.job_url = jobs.url
    group by term, ${period}`)
    .asCallback(callback)
}

function jobsPerPeriod (period, callback) {
  const format = period === 'month' ? "'%Y-%m'" : "'%Y-%W'"

  db.raw(
    `select count(distinct url) as jobs_per_${period},
    strftime(${format}, listing_date) as ${period}
    from jobs 
    where ${period} is not null
    group by ${period}`
  )
  .asCallback(callback)
}

const insertOrUpdate = period => (termCount, callback) => {
    db(`${period}s`)
      .where(termCount)
      .select()
      .asCallback((err, rows) => {
        if (rows.length > 0) {
          db(`${period}s`)
            .where('rowId', rows[0].rowId)
            .update(termCountA)
            .asCallback(callback)
        } else {
          db(`${period}s`)
            .insert(termCount)
            .asCallback(callback)
        }
      })
}

const period = 'week'
jobsPerPeriod(period, (err, periods) => {
  console.log('periods', periods)
  const periodTotals = _.zipObject(
    _.map(periods, period),
    _.map(periods, `jobs_per_${period}`)
  )

  termCountsPerPeriod(period, (err, termCounts) => {
    console.log(termCounts, periodTotals)
    pull(
      values(termCounts),
      map(termCount => {
        return row(period, termCount, periodTotals[termCount[period]])
      }),
      asyncMap(insertOrUpdate(period)),
      onEnd(() => {
        console.log('done')
      })
    )
  })
})

function row (period, termCount, total) {
  return Object.assign(
    {}, 
    termCount, 
    { 
      percentage_of_jobs: termCount.total_jobs / total, 
      [`${period}_term`]: `${termCount[period]}_${termCount.term}` 
    }
  )
}





// past months
// terms joined jobs in past months
//  job count per term per month
//  calculate percentage
//  check months table == ?
//    if false
//      update
//
// total term mentions term per month
//  check months table == ?
//    if false
//      update
//

// month: DateTime, 
// term: string, 
// percentage_of_jobs: float, 
// total_jobs_per_month: integer
// total_mentions_per_month: integer


