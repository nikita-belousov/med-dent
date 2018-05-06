const _  = require('lodash')
const mongoose = require('mongoose')
const slug = require('slug')

const ReviewSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String,
    maxlength: 200
  },
  review: {
    required: true,
    type: String
  },
  response: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  rating: {
    required: true,
    type: Number,
    min: 1,
    max: 5
  }
}, { timestamps: true })

mongoose.model('Review', ReviewSchema)
