const router = require('express').Router()
const apis = require('./declaration')

router.use('/news', apis.news)
router.use('/staff', apis.staff)
router.use('/reviews', apis.reviews)
router.use('/specials', apis.specials)
router.use('/questions', apis.questions)
router.use('/service_categories', apis.serviceCategories)
router.use('/services', apis.services)
router.use('/users', apis.users)
router.use('/appointment', apis.appointment)
router.use('/count_cost', apis.countCost)
router.use('/callback', apis.callback)

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors)
        .reduce((res, key) => ({
          ...res,
          [key]: err.errors[key].message
        }), {})
    })
  }

  return next(err)
})

router.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      error: {
        message: err.message,
        error: err
      }
    })
})

module.exports = router
