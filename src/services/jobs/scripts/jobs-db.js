const db = require('../../../data')

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

  exist: (job, callback) => {
    db('jobs')
    .select()
    .where('url', job.url)
    .asCallback((err, rows) => {
      if (err) callback(err)
        else callback(null, { url: job.url, exist: rows.length !== 0 })
    })
  },

  createCb: (job, callback) => {
    db('jobs')
    .insert(job, 'url')
    .asCallback(callback)
  },

  updateCb: (job, callback) => {
    db('jobs')
    .where('url', job.url)
    .update(job)
    .asCallback(callback)
  }
}

