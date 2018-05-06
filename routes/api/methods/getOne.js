const getOne = (Model, options) => (req, res, next) => {
  const { doc } = req

  let cb = null
  if (options) cb = options.cb

  if (cb) {
    const returnVal = cb(req, res, doc)
    // in case cb returns this.save()
    if (returnVal && typeof returnVal.then === 'function') {
      return returnVal.then(() => res.json({ doc }))
    }
  }

  res.json({ doc })
}

module.exports = getOne
