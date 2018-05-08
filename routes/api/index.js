const router = require('express').Router()
const apis = require('./declaration')

router.use('/news', apis.newsApi)
router.use('/staff', apis.staffApi)
router.use('/reviews', apis.reviewsApi)
router.use('/specials', apis.specialsApi)
router.use('/questions', apis.questionsApi)
router.use('/service_categories', apis.serviceCategoriesApi)
router.use('/services', apis.servicesApi)
router.use('/users', apis.usersApi)
router.use('/appointment', apis.appointment)

// TODO: remove
router.use('/check_site', require('./checkSite'))

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
