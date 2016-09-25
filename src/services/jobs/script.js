const Url = require('url')
const co = require('co')
const Nightmare = require('nightmare')
const map = require('lodash/fp/map')
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const asyncMap = require('pull-stream/throughs/async-map')
const values = require('pull-stream/sources/values')
const filter = require('pull-stream/throughs/filter')
const onEnd = require('pull-stream/sinks/on-end')

const _ = require('lodash')
const app = require('../../app')


const jobService = app.service('jobs')

const searchTerms = ['web developer'] 

const config = {
  protocol: 'https',
  hostname: 'www.seek.co.nz',
  pathname: '/jobs/in-new-zealand/',
  hash: '#dateRange=999&workType=0&industry=&occupation=&graduateSearch=false&salaryFrom=0&salaryTo=999999&salaryType=annual&companyID=&advertiserID=&advertiserGroup=&displaySuburb=&seoSuburb=&where=All+New+Zealand&whereId=3001&whereIsDirty=false&isAreaUnspecified=false&location=3001&area=&nation=3001&sortMode=KeywordRelevance&searchFrom=quick&searchType='
}


recurseSeek(searchTerms, 1)


function seek (url) {
  console.log('url', url)

  return new Nightmare()
  .goto(url)
  .wait()
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
}

function recurseSeek (searchTerms, page) {
  co(function* () {
    const result = yield seek(generateURL(searchTerms, page))

    pull(
      values(result.links),
      asyncMap(jobService.exist),
      filter(job => !job.exist),
      pullMap(job => { delete job.exist; return job }),
      asyncMap(jobService.createCb),
      onEnd(() => {
        console.log('result', result.next)
        jobService.where({ text: null }, (err, rows) => {
          console.log('rows', rows, err)                
        })
        if (result.next) {
          recurseSeek(searchTerms, result.next) 
        }
      })
    )
  })
}

function keywords (searchTerms) {
  return map(term => term.replace(' ', '+'))(searchTerms).join('%2C+')
}

function generateURL (searchTerms, page) {
  return `${Url.format(config)}&keywords=${keywords(searchTerms)}&page=${page}`

}


