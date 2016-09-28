const db = require('../../../../data')

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

function termCountsPerMonth (callback) {
  db.raw(
    `select count(distinct job_url) as total_jobs, 
    strftime('%Y-%m', listing_date) as month, 
    sum(document_frequency) as total_mentions,
    term from terms 
    inner join jobs on terms.job_url = jobs.url
    group by term, month`)
    .asCallback(callback)
}

function jobsPerMonth (callback) {
  db.raw(
    `select count(distinct url) as jobs_per_month,
    strftime('%Y-%m', listing_date) as month
    from jobs 
    where month is not null
    group by month`
  )
  .asCallback(callback)
}



function insertOrUpdateMonth (termCount, callback) {
    db('months')
      .where(termCount)
      .select()
      .asCallback((err, rows) => {
        if (rows.length > 0) {
          db('months')
            .where('rowId', rows[0].rowId)
            .update(termCountA)
            .asCallback(callback)
        } else {
          db('months')
            .insert(termCount)
            .asCallback(callback)
        }
      })
}


jobsPerMonth((err, months) => {

  const monthTotals = _.zipObject(
    _.map(months, 'month'),
    _.map(months, 'jobs_per_month')
  )

  termCountsPerMonth((err, termCounts) => {
    pull(
      values(termCounts),
      map(termCount => {
        console.log(termCount)
        return month(termCount, monthTotals[termCount.month])
      }),
      map(m => {
        console.log(m)
        return m
      }),
      asyncMap(insertOrUpdateMonth),
      onEnd(() => {
        console.log('done')
      })
    )
  })
})

function month (termCount, total) {
  return Object.assign(
    {}, 
    termCount, 
    { 
      percentage_of_jobs: termCount.total_jobs / total, 
      month_term: `${termCount.month}_${termCount.term}` 
    }
  )
}

function monthStartAndEndsFrom (startMonth) { // start: YYYY-MM
  const months = []
  const range = moment.range(moment(startMonth, 'YYYY-MM'), moment())
  range.by('month', m => {
    months.push(
      [
        m.startOf('month').format('YYYY-MM-DD'), 
        m.endOf('month').format('YYYY-MM-DD')
      ]
    )
  })
  return months
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


