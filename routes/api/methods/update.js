const update = (Model, options) => (req, res, next) => {
  Object
    .keys(req.body)
    .forEach(key => {
      if (key in req.doc) {
        req.doc.set(key, req.body[key])
      }
    })

  req.doc
    .save()
    .then(doc => {
      res.json({ doc })
    })
    .catch(next)
}

module.exports = update
