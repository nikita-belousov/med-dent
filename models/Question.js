const _  = require('lodash')
const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  question: {
    required: true,
    type: String
  },
  answer: {
    type: String
  }
}, { timestamps: true })

mongoose.model('Question', QuestionSchema)
