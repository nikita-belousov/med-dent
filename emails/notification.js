const path = require('path')
const transport = require('./transport')
const Email = require('email-templates')

const notification = new Email({
  message: { from: 'notifications@meddent.su' },
  transport: transport,
  send: true,
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.resolve('emails/templates/appointment')
    }
  }
})

module.exports = notification
