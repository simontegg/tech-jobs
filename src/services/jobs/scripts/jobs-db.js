const db = require('../../../../data')

module.exports = {
  whereSelect: (params, callback) => {
    db('jobs')
    .select(params.rows || '*')
    .where(params.query || {})
    .asCallback(callback)
  },

  whereNotNull: (column, callback) => {
    db('jobs')
    .whereNotNull(column)
    .asCallback(callback)
  },

  where: (query, callback) => {
    db('jobs')
    .select()
    .where(query)
    .asCallback(callback)
  },

  getCb: (url, callback) => {
    db('jobs')
    .select()
    .where('url', url)
    .asCallback((err, rows) => {
      if (err) callback(err)
        else callback(null, rows[0])
    })
  },

  exist: (jobUrl, callback) => {
    db('jobs')
    .select()
    .where('url', jobUrl)
    .asCallback((err, rows) => {
      console.log('r', rows)
      if (err) callback(err)
      else callback(null, { url: jobUrl, exist: rows.length !== 0 })
    })
  },

  createCb: (job, callback) => {
    db('jobs')
    .insert(job)
    .asCallback(callback)
  },

  updateCb: (job, callback) => {
    db('jobs')
    .where('url', job.url)
    .update(job)
    .asCallback(callback)
  }
}

