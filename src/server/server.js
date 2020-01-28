require('dotenv').config()

const cors = require('cors')
const helmet = require('helmet')
const db = require('../config/db')
const routes = require('./routing')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('../config/winston').logger
const config = require('../config/env/config')
const errorHandler = require('../middlewares/errorHandler')

let app = express()

// Set server variables
app.set('env', config.env)
app.set('hostname', config.hostname)

// Middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

// Add routing
app.use(routes)

// Add erro handling
app.use(errorHandler)

db.connect()
  .then(function() {
    let hostname = app.get('hostname'),
      port = app.get('port')

    app.listen(port, function() {
      logger.info(`Express app listening on http://${hostname}:${port}/api`)
    })
  })
  .catch(function(error) {
    logger.error(error)
  })

module.exports = app