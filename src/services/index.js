const jobs = require('./jobs')
const timeSeries = require('./time-series')
const terms = require('./terms')

const path = require('path')
const fs = require('fs-extra')
module.exports = function() {
  const app = this

  app.configure(timeSeries)
  app.configure(terms)
//  app.configure(authentication)
  app.configure(jobs)
}
