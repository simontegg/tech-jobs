const db = require('../../../data')
const hooks = require('../hooks')
const createService = require('feathers-knex')

module.exports = function () {
  const app = this
  const service = createService({
    Model: db,
    name: 'terms',
    paginate: {
      default: 100,
      max: 100
    }
  })

  app.use('api/v1/terms', service)
  const termService = app.service('api/v1/terms')
  termService.before(hooks.before)
}
