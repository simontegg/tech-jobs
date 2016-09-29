const hooks = require('feathers-hooks')

module.exports = {
    before: {
      create: hooks.disable('external'),
      remove: hooks.disable('external'),
      update: hooks.disable('external'),
      patch: hooks.disable('external')
    }
}
