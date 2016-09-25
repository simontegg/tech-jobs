const jobs = require('./jobs')
const stats = require('./stats')
const terms = require('./terms')
const authentication = require('./authentication')

const path = require('path')
const fs = require('fs-extra')
module.exports = function() {
  const app = this

  app.configure(stats)
  app.configure(terms)
//  app.configure(authentication)
  app.configure(jobs)
}
