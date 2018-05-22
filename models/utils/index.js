const slug = require('slug')

module.exports = {
  slugify(next) {
    if (!this.slug) {
      this.slug = slug(this.title)
    }
    next()
  },

  fullNameToInitials(name) {
    return name
      .split(' ')
      .map((word, i) => i === 0 ? word : `${word[0]}.`)
      .join(' ')
  }
}
