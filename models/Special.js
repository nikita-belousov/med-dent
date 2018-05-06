const mongoose = require('mongoose')
const slug = require('slug')
const Article = mongoose.model('Article')

const IMAGE_PATH = 'specials/'
const THUMBNAIL_PATH = 'specials/thumbnails/'

const SpecialSchema = mongoose.Schema({
  dateExpires: Date,
  thumbnail: {
    type: String,
    required: true,
    set: val => THUMBNAIL_PATH + val
  },
  showOnHomepage: {
    type: Boolean,
    default: false
  },
  color: {
    required() { return this.showOnHomepage },
    type: String
  },
  shortDescription: {
    type: String
  },
  image: {
    required() { return this.showOnHomepage },
    type: String,
    set: val => IMAGE_PATH + val
  }
})

SpecialSchema.pre('validate', function(next) {
  if (!this.shortDescription) {
    this.shortDescription = this.text
  }
  next()
})

SpecialSchema.methods.toCardJSON = function() {
  return {
    slug: this.slug,
    title: this.title,
    color: this.color,
    shortDescription: this.shortDescription,
    image: this.image
  }
}

module.exports = Article.discriminator(
  'Special',
  SpecialSchema
)
