const getAll = (Model, options) => (req, res, next) => {
  let count, generateResponse, populate, query, collection

  if (options) {
    count = options.count
    populate = options.populate
    generateResponse = options.generateResponse
    query = options.query
    collection = options.collection
  }

  populate = populate || ''

  let { _start, _limit, _sort, ...restQuery } = req.query

  const start = Number(_start) || null
  const limit = Number(_limit) || null

  let sort = sortField = sortOrder = null
  if (_sort) {
    if (_sort.includes(':')) {
      [sortField, sortOrder] = _sort.split(':')
      sort = { [sortField]: sortOrder === 'desc' ? -1 : 1 }
    } else {
      sort = _sort
    }
  }

  const combineQuery = Object.assign({}, query, restQuery)

  Promise
    .all([
      Model
        .find(combineQuery)
        .skip(start)
        .limit(limit)
        .sort(sort)
        .populate(populate)
        .exec(),
      count ? Model.count(query || {}) : null
    ])
    .then(result => {
      const [ docs, count ] = result
      const response = generateResponse
        ? generateResponse(req, res, docs)
        : { docs }

      if (count) response.count = count
      if (collection) response.collection = collection

      res.json(response)
    })
    .catch(next)
}

module.exports = getAll
