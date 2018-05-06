const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const Question = mongoose.model('Question')

chai.use(chaiHttp)

describe('Question', () => {
  const sampleDoc = {
    author: 'Елена',
    question: 'Сколько стоит удаление зуба?',
    response: 'Зависит от степени сложности.'
  }

  beforeEach(done => {
    Question.remove({}, err => done())
  })

  it('creates and saves news entity', done => {
    new Question(sampleDoc)
      .save((err, doc) => {
        expect(doc).to.deep.include(sampleDoc)
        done()
      })
  })
})
