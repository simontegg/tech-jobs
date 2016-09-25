const minBy = require('lodash/fp/minBy') 
const range = require('lodash').range
const map = require('lodash/fp/map')
const countBy = require('lodash/fp/countBy')

const week = 7 * 24 * 60 * 60

module.exports = function (data, key, term, end) {
  return map(weekEnd => ({
    count: countBy(d => {
      return d[key] < weekEnd && d[key] >= weekEnd - week
    })(data).true || 0,
    term: term,
    weekEnd: weekEnd
  }))(range(
    end, 
    minBy(key)(data)[key], 
    -week
  ))
}



