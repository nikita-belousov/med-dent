const { slugify } = require('./utils')
const _  = require('lodash')
const mongoose = require('mongoose')
const slug = require('slug')

const { Schema } = mongoose

const ServiceCategorySchema = Schema({
  slug: {
    required: true,
    type: String
  },
  title: {
    required: true,
    type: String
  },
  order: {
    required: true,
    type: Number
  }
}, { collection: 'service_categories' })

ServiceCategorySchema.pre('validate', slugify)

mongoose.model('ServiceCategory', ServiceCategorySchema)
