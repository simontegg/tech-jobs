const db = require('../../../data')

module.exports = {
  whereSelect: (params, callback) => {
    db('terms')
    .select(params.rows || '*')
    .where(params.query || {})
    .asCallback(callback)
  },

  whereNotNull: (column, callback) => {
    db('terms')
    .whereNotNull(column)
    .asCallback(callback)
  },

  where: (query, callback) => {
    db('terms')
    .select()
    .where(query)
    .asCallback(callback)
  },

  get: (term, callback) => {
    db('terms')
    .select()
    .where('term', term)
    .asCallback((err, rows) => {
      if (err) callback(err)
        else callback(null, rows[0])
    })
  },

  createCb: (term, callback) => {
    db('terms')
    .insert(term)
    .asCallback(callback)
  },

  updateCb: (term, callback) => {
    db('terms')
    .where('url', job.url)
    .update(job)
    .asCallback(callback)
  }
}

