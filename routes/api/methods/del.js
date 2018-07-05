const del = (Model, options) => (req, res, next) => {
  req.doc
    .remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = del
