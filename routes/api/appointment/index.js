const router = require('express').Router()
const transporter = require('./transporter')

const template = `
  %name% хочет записаться на прием. \n
  Email: %email%
  Телефон: %phone%
  Проблема: %problem%
`

const renderTemplate = (template, data) => {
  let res = template
  Object.keys(data).forEach(key => {
    res = res.replace(`%${key}%`, data[key])
  })
  return res
}

router.post('/', (req, res, next) => {
  transporter.sendMail({
    from: 'notifications@meddent.su',
    to: 'med-dent.dom@mail.ru',
    subject: 'Запись на прием',
    text: renderTemplate(template, req.body)
  })

  res.sendStatus(204)
})

module.exports = router
