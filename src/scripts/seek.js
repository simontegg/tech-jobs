const Nightmare = require('nightmare')

module.exports = function seek (url, callback) {
  //console.log('url', url)

  return new Nightmare({show: false})
  .goto(url)
  .wait(7000)
  .evaluate(function () {
    var links = []

    $('a.job-title').each(function (i, el) {
      links.push({
        url: 'https://www.seek.co.nz' + $(this).attr('href').split('?')[0]
      })
    })

    return { links: links, next: $('dd.next-page > a').attr('data-page') }
  })
  .end()
  .then((result) => {
    callback(null, result)
  })
  .catch(callback)
}
