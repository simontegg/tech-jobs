const map = require('lodash/fp/map')

module.exports = function (all, counts) {
  let index = -1
  return map(t => {
    index ++ 
    return {
      count: t.count,
      percentage: t.count / all[index].count,
      term: t.term,
      weekEnd: t.weekEnd
    }
  })(counts)
}

