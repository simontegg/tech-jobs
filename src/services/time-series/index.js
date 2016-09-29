const db = require('../../../data')
const hooks = require('../hooks')
const createService = require('feathers-knex')
const monthsRoute =  'api/v1/time-series/months'
const weeksRoute =  'api/v1/time-series/weeks'


module.exports = function () {
  const app = this
  const months = createService({
    Model: db,
    name: 'months',
    paginate: {
      default: 100,
      max: 100
    }
  })

  const weeks = createService({
    Model: db,
    name: 'weeks',
    paginate: {
      default: 100,
      max: 100
    }
  })
  
  app.use(monthsRoute, months)
  app.use(weeksRoute, weeks)
  
  const monthService = app.service(monthsRoute)
  monthService.before(hooks.before)
  
  const weekService = app.service(weeksRoute)
  weekService.before(hooks.before)
}
