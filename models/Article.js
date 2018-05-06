const { slugify } = require('./utils')
const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  slug: {
    type: String,
    lowercase: true
  },
  text: {
    required: true,
    type: String
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

ArticleSchema.pre('validate', slugify)

ArticleSchema.methods.incrementViews = function() {
  this.views = this.views + 1
  return this.save()
}

mongoose.model('Article', ArticleSchema)
