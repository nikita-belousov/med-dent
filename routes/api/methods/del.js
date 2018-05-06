const del = (Model, options) => (req, res, next) => {
  console.log(111)

  req.doc
    .remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = del
