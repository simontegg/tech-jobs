const Nightmare = require('nightmare')
const moment = require('moment')



module.exports = getJob

function getJob (url, callback) {
  return new Nightmare()
    .goto(url)
    .wait()
    .evaluate(function (url) {
      return {
        url: url,
        listing_date: document.querySelector('.mod-job-details > strong').textContent,
        heading: document.querySelector('.grid_6 > h1').textContent,
        text: $('.templatetext').text(),
        location: $('span[itemprop="addressRegion"]').text()
      }
    }, url)
    .end()
    .then((result) => callback(null, result))
    .catch(callback)
}
