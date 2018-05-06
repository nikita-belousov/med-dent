const mongoose = require('mongoose')
const slug = require('slug')
const Article = mongoose.model('Article')

const THUMBNAIL_PATH = 'news/thumbnails/'

const newsEntitySchema = mongoose.Schema({
  thumbnail: {
    type: String,
    required: true,
    set: val => THUMBNAIL_PATH + val
  }
})

module.exports = Article.discriminator(
  'NewsEntity',
  newsEntitySchema
)
