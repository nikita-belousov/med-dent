const mongoose = require('mongoose')
const _ = require('lodash')
const User = mongoose.model('User')

const post = (Model, options) => (req, res, next) => {
  let auth, onCreateDoc, beforeSave, createDoc, send

  if (options) {
    auth = options.auth
    modifyValues = options.modifyValues
    beforeSave = options.beforeSave
    createDoc = options.createDoc
    send = options.send
  }

  const resolve = auth
    ? User
        .findById(req.payload.id)
        .populate('role', 'name')
        .exec()
    : null

  Promise
    .resolve(resolve)
    .then(user => {
      if (auth) {
        if (!user) {
          return res.sendStatus(401)
        }

        const allowed = [].concat(auth)
        if (!allowed.includes(user.role.name)) {
          return res.sendStatus(403)
        }
      }

      if (typeof createDoc === 'undefined' || createDoc === true)  {
        const doc = new Model()

        let values = req.body
        if (onCreateDoc) {
          values = _.merge(values, options.onCreateDoc(values, doc))
        }
        if (beforeSave) {
          beforeSave(values, doc)
        }

        doc
          .set(values)
          .save()
          .then(doc => {
            if (send) {
              return send(req, res, next, doc)
            } else {
              return res.json({ doc })
            }
          })
          .catch(next)
      } else if (send) {
        return send(req, res, next)
      } else {
        return res.sendStatus(204)
      }
    })
}

module.exports = post
