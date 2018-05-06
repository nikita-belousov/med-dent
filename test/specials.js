const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const Special = require('./../models/Special')

chai.use(chaiHttp)

describe('Special', () => {
  const API = '/api/news'

  const sampleDoc = {
    title: 'Протезирование в рассрочку.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'tinkoff.png'
  }

  beforeEach(done => {
    Special.remove({}, () => done())
  })

  it('creates and saves review', done => {
    new Special(sampleDoc)
      .save()
      .then(doc => {
        expect(doc).to.deep.include({
          ...sampleDoc,
          thumbnail: 'specials/thumbnails/tinkoff.png'
        })
        done()
      })
  })

  it('requires `color`, `shortDescription`, `image` fields \
      if `showOnHomepage` is true', done => {
    chai
      .request(app)
      .post('/api/specials')
      .send({
        ...sampleDoc,
        showOnHomepage: true
      })
      .end((err, res) => {
        expect(res).to.have.status(422)
        expect(res.body).to.have.property('errors')
        expect(res.body.errors).to.include.all.keys('color', 'shortDescription', 'image')
        done()
      })
  })
})
