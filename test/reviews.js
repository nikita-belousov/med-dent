const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const Review = mongoose.model('Review')

chai.use(chaiHttp)

describe('Review', () => {
  const API = '/api/news'

  const sampleDoc1 = {
    author: 'Елена', review: 'Лечилась у доктора Савельевой Дианы Сергеевны,понравилось ее отношение к людям и порадовали цены,за пломбу отдала 1300 рублей.',
    rating: 5,
    isPublished: true
  }
  const sampleDoc2 = {
    author: 'Ольга',
    review: 'Протезировала зубы у доктора Мирошникова Олега.Порадовало качество работы и цены .А так же,что в самой клинике на лечение взяла кредит беспроцентный на 10 месяцев.',
    rating: 4
  }

  beforeEach(done => {
    Review.remove({}, err => done())
  })

  it('creates and saves review', done => {
    Review
      .create([sampleDoc1, sampleDoc2])
      .then(docs => {
        expect(docs).to.be.a('array').with.length(2)
        expect(docs[0]).to.deep.include(sampleDoc1)
        expect(docs[1]).to.deep.include({
          ...sampleDoc2,
          isPublished: false
        })
        done()
      })
  })
})
