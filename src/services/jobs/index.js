const db = require('../../../data')
const hooks = require('../hooks')
const createService = require('feathers-knex')

module.exports = function (defaultNum, max) {
  const app = this
  const service = createService({
    Model: db,
    name: 'jobs',
    paginate: {
      default: defaultNum || 10,
      max: max || 100
    }
  })

  // Initialize our service with any options it requires
  app.use('api/v1/jobs', service)
  const jobService = app.service('api/v1/jobs')
  jobService.before(hooks.before)

}
