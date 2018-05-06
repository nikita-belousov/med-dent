const isProduction = process.env.NODE_ENV === 'production'

const express = require('express')
const path = require('path')

require('./models/Article')
require('./models/Dentist')
require('./models/Review')
require('./models/ServiceCategory')
require('./models/Service')
require('./models/Question')
require('./models/User')
require('./models/Role')

const app = require('./utils/createApp')()

app.use(require('./routes'))

if (isProduction) {
  app.use('/static', express.static(path.join(__dirname, '/frontend/build/static')))

  app.get('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
  })
}

const server = app.listen(
  isProduction ? 80 : (process.env.PORT || 8080),
  () => console.log(`Listening on port ${server.address().port}`)
)

module.exports = app
