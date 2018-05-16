const _  = require('lodash')
const mongoose = require('mongoose')

const { Schema } = mongoose

const ServiceSchema = Schema({
  title: {
    required: true,
    type: String
  },
  order: {
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

ServiceSchema.statics.getNextOrder = function(categoryId) {
  return this
    .findOne({ category: categoryId })
    .sort({ order: -1 })
    .exec()
    .then(doc => doc.order + 1)
}

mongoose.model('Service', ServiceSchema)
