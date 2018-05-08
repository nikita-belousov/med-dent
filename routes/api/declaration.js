const mongoose = require('mongoose')
const createApi = require('./createApi')
const passport = require('./../passport')
const notification = require('./../../emails/notification')
const { formatPhoneInternational } = require('./../../utils')

console.log(formatPhoneInternational('+7 (977) 295-71-27'))

const questionsApi = createApi(
  mongoose.model('Question'),
  [
    'post',
    {
      method: 'get',
      count: true,
      query: {
        answer: { $exists: true, $ne: null }
      }
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const reviewsApi = createApi(
  mongoose.model('Review'),
  [
    'post',
    {
      method: 'get',
      count: true
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const newsApi = createApi(
  require('./../../models/NewsEntity'),
  [
    {
      method: 'get',
      count: true
    },
    {
      method: 'getOne',
      cb: (req, res, doc) => doc.incrementViews()
    },
    {
      method: 'post',
      auth: 'admin'
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ],
  true
)

const specialsApi = createApi(
  require('./../../models/Special'),
  [
    {
      method: 'get',
      count: true
    },
    {
      method: 'get',
      path: '/cards',
      count: true,
      generateResponse: (req, res, docs) => ({
        docs: docs.map(doc => doc.toCardJSON())
      })
    },
    {
      method: 'getOne',
      cb: (req, res, doc) => doc.incrementViews()
    },
    {
      method: 'post',
      auth: 'admin'
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ],
  true
)

const serviceCategoriesApi = createApi(
  mongoose.model('ServiceCategory'),
  [
    'get',
    {
      method: 'post',
      auth: 'admin'
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const servicesApi = createApi(
  mongoose.model('Service'),
  [
    {
      method: 'get',
      populate: 'category'
    },
    {
      method: 'post',
      auth: 'admin'
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const staffApi = createApi(
  mongoose.model('Dentist'),
  [
    {
      method: 'get',
      count: true
    },
    {
      method: 'get',
      path: '/selectOptions',
      generateResponse: (req, res, docs) => ({
        docs: docs.map(doc => doc.toSelectOptionJSON())
      })
    },
    'getOne',
    {
      method: 'post',
      auth: 'admin'
    },
    {
      method: 'update',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const usersApi = createApi(
  mongoose.model('User'),
  [
    {
      method: 'post',
      auth: 'admin',
      beforeSave: (values, doc) => {
        doc.setPassword(values.password)
      }
    },
    {
      method: 'post',
      path: '/login',
      createDoc: false,
      send: (req, res, next, doc) => {
        const { username, password } = req.body
        if (!username || !password) {
          return res
            .status(422)
            .json({ errors: 'oops, something is missing' })
        }

        passport.authenticate(
          'local',
          { session: false },
          (err, user, info) => {
            if (err) {
              return next(err)
            }

            if (user) {
              user.token = user.generateJWT()
              return res.json(user.toAuthJSON())
            } else {
              return res.status(422).json({ info })
            }
          }
        )(req, res, next)
      }
    },
    {
      method: 'put',
      auth: 'admin'
    },
    {
      method: 'del',
      auth: 'admin'
    }
  ]
)

const appointment = createApi(
  mongoose.model('Appointment'),
  {
    method: 'post',
    send: (req, res, next) =>
      notification.send({
        template: 'templates/appointment',
        message: { to: 'seriouscat1001@gmail.com' },
        locals: {
          ...req.body,
          internationalPhone: formatPhoneInternational(req.body.phone)
        }
      })
  }
)

const countCost = createApi(
  null,
  {
    method: 'post',
    createDoc: false,
    send: (req, res, next) =>
      notification.send({
        template: 'templates/countCost',
        message: { to: 'seriouscat1001@gmail.com' },
        locals: {
          ...req.body,
          internationalPhone: formatPhoneInternational(req.body.phone)
        }
      })
  }
)

module.exports = {
  questionsApi,
  reviewsApi,
  newsApi,
  specialsApi,
  serviceCategoriesApi,
  servicesApi,
  staffApi,
  usersApi,
  appointment,
  countCost
}
