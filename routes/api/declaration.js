const fs = require('fs')
const mongoose = require('mongoose')
const createApi = require('./createApi')
const passport = require('./../passport')
const notification = require('./../../emails/notification')
const { formatPhoneInternational } = require('./../../utils')


const notificationEmail = JSON.parse(
  fs.readFileSync('./config/notificationEmail.json', 'utf-8')
)[process.env.NODE_ENV || 'development']


const questions = createApi(
  mongoose.model('Question'),
  [
    {
      method: 'post',
      beforeSave: values => {
        console.log('...posted')
        notification.send({
          template: 'templates/questionPosted',
          message: { to: notificationEmail },
          locals: values
        })
      }
    },
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

const reviews= createApi(
  mongoose.model('Review'),
  [
    {
      method: 'post',
      beforeSave: values => {
        notification.send({
          template: 'templates/reviewPosted',
          message: { to: notificationEmail },
          locals: values
        })
      }
    },
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

const news = createApi(
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

const specials = createApi(
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

const serviceCategories = createApi(
  mongoose.model('ServiceCategory'),
  [
    {
      method: 'get'
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

const Model = mongoose.model('Service')

const services = createApi(
  Model,
  [
    {
      method: 'get',
      populate: 'category'
    },
    {
      method: 'post',
      auth: 'admin',
      beforeSave: (values, doc) => {
        if (!('order' in values)) {
          return Model
            .getNextOrder(values.category)
            .then(value => doc.set('order', value))
        }
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

const staff = createApi(
  mongoose.model('Dentist'),
  [
    {
      method: 'get',
      count: true,
      generateResponse: (req, res, docs) => ({
        docs: docs.map(doc => Object.assign(
          doc.toObject(),
          doc.toSelectOptionJSON()
        ))
      })
    },
    {
      method: 'get',
      path: '/select_options',
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
  ],
  true
)

const users = createApi(
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
    createDoc: false,
    send: (req, res, next) => {
      const { phone, dentist } = req.body

      const send = locals => {
        notification.send({
          template: 'templates/appointment',
          message: { to: notificationEmail },
          locals: {
            ...locals,
            internationalPhone: formatPhoneInternational(phone)
          }
        })
      }

      if (dentist) {
        mongoose
          .model('Dentist')
          .findOne({ id: dentist })
          .then(dent => {
            send({ ...req.body, dentist: dent.name })
          })
      } else {
        send(req.body)
      }
    }
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
        message: { to: notificationEmail },
        locals: {
          ...req.body,
          internationalPhone: formatPhoneInternational(req.body.phone)
        }
      })
  }
)

const callback = createApi(
  null,
  {
    method: 'post',
    createDoc: false,
    send: (req, res, next) =>
      notification.send({
        template: 'templates/callback',
        message: { to: notificationEmail },
        locals: {
          ...req.body,
          internationalPhone: formatPhoneInternational(req.body.phone)
        }
      })
  }
)

module.exports = {
  questions,
  reviews,
  news,
  specials,
  serviceCategories,
  services,
  staff,
  users,
  appointment,
  countCost,
  callback
}
