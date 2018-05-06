const fs = require('fs')
const http = require('http')
const path = require('path')
const methods = require('methods')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'

const createApp = () => {
  const app = express()

  app.use(cors())
  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(require('method-override')())
  app.use(express.static(__dirname + '/public'))

  app.use(session({
    secret: 'conduit',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  }))

  if (env !== 'production') {
    app.use(errorhandler())
  }

  const DB_DATA = JSON.parse(fs.readFileSync('./db.json', 'utf-8'))
  const { host, port, name, user, password } = DB_DATA[env]

  mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/${name}`)

  return app
}

module.exports = createApp
