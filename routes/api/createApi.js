const mongoose = require('mongoose')
const authModule = require('./../auth')

const get = require('./methods/get')
const getOne = require('./methods/getOne')
const post = require('./methods/post')
const update = require('./methods/update')
const del = require('./methods/del')

const createApi = (Model, methods, bySlug = false) => {
  const router = require('express').Router()

  new Array().concat(methods).forEach(mt => {
    let paramSet = false

    if (typeof mt === 'string') {
      var method = mt
    } else if (typeof mt === 'object') {
      var { method, path, auth, ...options } = mt
    }

    const resPath = path ? path + '/' : '/'

    const middlewares = []
    if (auth) middlewares.push(authModule.required)

    switch(method) {
      case 'get':
        router.get(
          resPath,
          middlewares.concat(get(Model, options))
        )
        break
      case 'getOne':
        router.get(
          `${resPath}:docId`,
          middlewares.concat(getOne(Model, { ...options, auth }))
        )
        break
      case 'post':
        router.post(
          resPath,
          middlewares.concat(post(Model, { ...options, auth }))
        )
        break
      case 'update':
        router.put(
          `${resPath}:docId`,
          middlewares.concat(update(Model, { ...options, auth }))
        )
        break
      case 'del':
        router.delete(
          `${resPath}:docId`,
          middlewares.concat(del(Model, { ...options, auth }))
        )
        break
    }

    if (['getOne', 'update', 'del'].includes(method) && !paramSet) {
      router.param('docId', (req, res, next, id) => {
        Model
          .findOne(bySlug ? { slug: id } : { _id: id })
          .then(doc => {
            if (!doc) res.sendStatus(404)
            req.doc = doc
            next()
          })
          .catch(next)
      })
      paramSet = true
    }
  })

  return router
}

module.exports = createApi
