const fs = require('fs')
const nodemailer = require('nodemailer')

let smtpAuthData = fs.readFileSync('./config/smtp.json', 'utf-8')
smtpAuthData = JSON.parse(smtpAuthData)

module.exports = nodemailer.createTransport(smtpAuthData)
