const fs = require('fs')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const secret = JSON
  .parse(fs.readFileSync('./config/secretKey.json'))
  .secretKey

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
    index: true
  },
  role: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  },
  hash: String,
  salt: String
}, { timestamps: true })

UserSchema.plugin(uniqueValidator, { message: 'is already taken' })

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    exp: parseInt(exp.getTime() / 1000),
  }, secret)
}

UserSchema.methods.toAuthJSON = function() {
  return {
    username: this.username,
    token: this.generateJWT()
  }
}

mongoose.model('User', UserSchema)
