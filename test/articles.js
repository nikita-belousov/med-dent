const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const NewsEntity = require('./../models/NewsEntity')

chai.use(chaiHttp)

describe.only('Article', () => {
  const docSample = {
    title: 'Рассрочка с банком Tinkoff',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'tinkoff.png'
  }

  beforeEach(done => {
    NewsEntity.remove({}, err => done())
  })

  it('increments views count on get doc', done => {
    new NewsEntity(docSample)
      .save()
      .then(doc => {
        chai
          .request(app)
          .get(`/api/news/${doc.slug}`)
          .then(res => {
            NewsEntity
              .findOne({ slug: doc.slug })
              .then(doc => {
                expect(doc.views).to.eql(1)
                done()
              })
          })
      })
  })
})
