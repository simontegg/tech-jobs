const co = require('co')
const Nightmare = require('nightmare')

module.exports = getJob

function getJob (url, callback) {
  return new Nightmare()
    .goto(url)
    .wait()
    .evaluate(function (url) {
      return {
        url: url,
        listing_date: new Date(
          document.querySelector('.mod-job-details > strong').textContent
        ).getTime() / 1000,
        heading: document.querySelector('.grid_6 > h1').textContent,
        text: $('.templatetext').text(),
        location: $('span[itemprop="addressRegion"]').text()
      }
    }, url)
    .end()
    .then(result => {
      console.log('res', result)
      callback(null, result)
    })
    .catch(callback)
}
