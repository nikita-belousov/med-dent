const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const Dentist = mongoose.model('Dentist')

chai.use(chaiHttp)

describe('Staff', () => {
  const docSample = {
    name: 'Алферова Юлия Олеговна',
    positions: ['терапевт'],
    experience: 2010,
    about: 'Высшее образование: Омский государственный медицинский университет, интернатура: Воронежская государственная медицинская академия. Стаж работы с 2011 года. Сертификат по детской стоматологии и взрослой терапевтической стоматологии.',
    image: 'alferova.png'
  }

  it('sets experince based on year', done => {
    new Dentist(docSample)
      .save()
      .then(doc => {
        expect(doc.experience).to.equal('8 лет')
        done()
      })
  })
})
