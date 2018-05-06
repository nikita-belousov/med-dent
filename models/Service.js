const _  = require('lodash')
const mongoose = require('mongoose')

const { Schema } = mongoose

const ServiceSchema = Schema({
  title: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  isSocial: {
    type: Boolean,
    default: false
  },
  category: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'ServiceCategory'
  }
})

mongoose.model('Service', ServiceSchema)
