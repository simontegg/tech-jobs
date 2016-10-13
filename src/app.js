const path = require('path')
const serveStatic = require('feathers').static
const favicon = require('serve-favicon')
const compress = require('compression')
const cors = require('cors')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest')
const bodyParser = require('body-parser')

const middleware = require('./middleware')
const services = require('./services')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const compiler = webpack(webpackConfig)

const app = feathers()

app.configure(configuration(path.join(__dirname, '..')));
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicpath: webpackConfig.output.publicPath
  }))
}

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use('/search', serveStatic( app.get('public') )) 
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(services)
  .configure(middleware)

module.exports = app
