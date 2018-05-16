const isProduction = process.env.NODE_ENV === 'production'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

require('./models/Article')
require('./models/Dentist')
require('./models/Review')
require('./models/ServiceCategory')
require('./models/Service')
require('./models/Question')
require('./models/User')
require('./models/Role')
require('./models/Appointment')

const app = require('./utils/createApp')()

app.use(require('./routes'))

if (isProduction) {
  app.use('/static', express.static(path.join(__dirname, '/frontend/build/static')))
  app.use(favicon(path.join(__dirname, 'frontend/build/static/favicon.ico')))

  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
  })
}

const server = app.listen(
  isProduction ? 80 : (process.env.PORT || 8080),
  () => console.log(`Listening on port ${server.address().port}`)
)

module.exports = app
