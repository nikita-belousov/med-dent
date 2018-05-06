const router = require('express').Router()
const htmlparser = require('htmlparser2')
const _superagent = require('superagent')
const superagentPromise = require('superagent-promise')
const superagent = superagentPromise(_superagent, Promise)

const ROOT = 'http://meddent.su'
const CORRECT_TITLE = 'Стоматология Мед-Дент'

let readingTitle = false
let verified = false

const parser = new htmlparser.Parser({
  onopentag: name => {
    if (name === 'title') {
      readingTitle = true
    }
  },
  onclosetag: name => {
    if (name === 'title') {
      readingTitle = false
    }
  },
  ontext: text => {
    if (readingTitle) {
      if (text.trim() === CORRECT_TITLE) {
        verified = true
      }
    }
  }
})

router.get('/', (req, res, next) => {
  superagent
    .get(ROOT)
    .then(({ text }) => {
      parser.write(text)
      parser.end()
      res.json({ verified })
    })
})

module.exports = router
