const slug = require('slug')

module.exports = {
  slugify(next) {
    if (!this.slug) {
      this.slug = slug(this.title)
    }
    next()
  }
}
