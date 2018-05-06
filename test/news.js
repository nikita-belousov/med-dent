const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const NewsEntity = require('./../models/NewsEntity')

chai.use(chaiHttp)

describe('NewsEntity', () => {
  const API = '/api/news'

  const sampleDoc = {
    title: 'Рассрочка с банком Tinkoff',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'tinkoff.png'
  }

  beforeEach(done => {
    NewsEntity.remove({}, err => done())
  })

  it('creates and saves news entity', done => {
    new NewsEntity(sampleDoc)
      .save((err, doc) => {
        expect(doc).to.deep.include({
          ...sampleDoc,
          thumbnail: `news/thumbnails/${sampleDoc.thumbnail}`,
          views: 0
        })
        done()
      })
  })
})
