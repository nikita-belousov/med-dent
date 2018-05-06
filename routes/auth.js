const fs = require('fs')
const jwt = require('express-jwt')

const secret = JSON
  .parse(fs.readFileSync('./config/secretKey.json'))
  .secretKey

const getToken = req => {
  const auth = req.get('authorization')

  if (auth) {
    const split = auth.split(' ')
    if (['Token', 'Bear'].includes(split[0])) {
      return split[1]
    }
  }

  return null
}

const auth = {
  required: jwt({
    secret,
    userProperty: 'payload',
    getToken
  }),
  optional: jwt({
    secret,
    userProperty: 'payload',
    credentialRequired: false,
    getToken
  })
}

module.exports = auth
