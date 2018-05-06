const removeRoute = require('express-remove-route')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('./../utils/createApp')()

require('./../models/Article')

const createApi = require('./../routes/api/createApi')
const NewsEntity = require('./../models/NewsEntity')

chai.use(chaiHttp)

const server = app.listen(
  process.env.PORT || 9999,
  // () => console.log(`Listening on port ${server.address().port}`)
)

describe('createApi', () => {
  const sampleDoc1 = {
    title: 'Рассрочка с банком Tinkoff',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'tinkoff.png'
  }
  const sampleDoc2 = {
    title: 'SMS-оповещения для пациентов',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'sms-notifications.png'
  }
  const sampleDoc3 = {
    title: 'Детская консультация — бесплатно!',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur quos nulla natus ipsum omnis accusantium!',
    thumbnail: 'children-consulation.png'
  }

  const apiOptions = {
    Model: NewsEntity
  }

  const checkNewsEntity = obj => {
    [].concat(obj).forEach(e => {
      expect(e).to.include.all.keys('title', 'text', 'thumbnail', 'slug', 'views')
    })
  }

  beforeEach(done => {
    NewsEntity.remove({}, err => done())
  })

  after(() => {
    mongoose.disconnect()
  })

  describe('GET all', () => {
    it('without options', done => {
      const routeName = '/getAll'
      app.use(routeName, createApi(NewsEntity, 'getAll'))

      NewsEntity
        .create([sampleDoc1, sampleDoc2], () => {
          chai
            .request(app)
            .get(routeName)
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('docs').be.a('array').with.length(2)
              checkNewsEntity(res.body.docs)
              done()
            })
        })
    })

    it('with count', done => {
      app.use('/getAllCount',
        createApi(NewsEntity, [{
          method: 'getAll',
          count: true
        }])
      )

      NewsEntity
        .create([sampleDoc1, sampleDoc2], () => {
          chai
            .request(app)
            .get('/getAllCount')
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('count').eql(2)
              expect(res.body).to.have.property('docs').be.a('array').with.length(2)
              checkNewsEntity(res.body.docs)
              done()
            })
        })
    })

    it('with callback', done => {
      app.use('/getAllCb', createApi(NewsEntity, {
        method: 'getAll',
        cb: (req, res, docs) => ({ docs, specialProperty: 666 })
      }))

      NewsEntity
        .create([sampleDoc1, sampleDoc2], () => {
          chai
            .request(app)
            .get('/getAllCb')
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('specialProperty').eql(666)
              done()
            })
        })
    })

    it('with query', done => {
      app.use('/getAllQuery', createApi(NewsEntity, {
        method: 'getAll',
        query: {
          thumbnail: 'news/thumbnails/tinkoff.png'
        }
      }))

      NewsEntity
        .create([sampleDoc1, sampleDoc2], () => {
          chai
            .request(app)
            .get('/getAllQuery')
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body.docs[0]).to.have.property('thumbnail').eql('news/thumbnails/tinkoff.png')
              done()
            })
        })
    })

    // TODO: работают только по отдельности
    describe('applies filters', done => {
      app.use('/getWithFilters', createApi(NewsEntity, 'getAll'))

      describe('sort', () => {
          it('ascend', done => {
            NewsEntity
              .create([sampleDoc1, sampleDoc2, sampleDoc3])
              .then(() => {
                chai
                  .request(app)
                  .get('/getWithFilters/?_sort=createdAt')
                  .end((err, res) => {
                    const { docs } = res.body
                    expect(docs[0]).to.deep.include({ title: sampleDoc1.title })
                    expect(docs[1]).to.deep.include({ title: sampleDoc2.title })
                    expect(docs[2]).to.deep.include({ title: sampleDoc3.title })
                    done()
                  })
              })
          })

          it('descend', done => {
            NewsEntity
              .create([sampleDoc1, sampleDoc2, sampleDoc3])
              .then(() => {
                chai
                  .request(app)
                  .get('/getWithFilters/?_sort=createdAt:desc')
                  .end((err, res) => {
                    const { docs } = res.body
                    expect(docs[0]).to.deep.include({ title: sampleDoc3.title })
                    expect(docs[1]).to.deep.include({ title: sampleDoc2.title })
                    expect(docs[2]).to.deep.include({ title: sampleDoc1.title })
                    done()
                  })
              })
          })
        })

        it('start', done => {
          NewsEntity
            .create([sampleDoc1, sampleDoc2, sampleDoc3])
            .then(() => {
              chai
              .request(app)
              .get('/getWithFilters/?&_sort=createdAt&_start=1')
              .end((err, res) => {
                const { docs } = res.body
                expect(docs[0]).to.deep.include({ title: sampleDoc2.title })
                expect(docs[1]).to.deep.include({ title: sampleDoc3.title })
                done()
              })
            })
        })

        it('limit', done => {
          NewsEntity
            .create([sampleDoc1, sampleDoc2, sampleDoc3])
            .then(() => {
              chai
              .request(app)
              .get('/getWithFilters/?_sort=createdAt&_start=1&_limit=1')
              .end((err, res) => {
                const { docs } = res.body
                expect(docs[0]).to.deep.include({ title: sampleDoc2.title })
                done()
              })
            })
        })
    })
  })

  describe('GET one', () => {
    it('gets doc by id', done => {
      app.use('/getOneId', createApi(NewsEntity, 'getOne'))

      new NewsEntity(sampleDoc1)
        .save()
        .then(doc => {
          chai
            .request(app)
            .get(`/getOneId/${doc._id}`)
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('doc')
              expect(res.body.doc).to.deep.include({
                ...sampleDoc1,
                thumbnail: 'news/thumbnails/tinkoff.png'
              })
              done()
            })
        })
    })

    it('gets doc by slug', done => {
      app.use('/getOneSlug', createApi(NewsEntity, 'getOne', true))

      new NewsEntity(sampleDoc1)
        .save()
        .then(doc => {
          chai
            .request(app)
            .get(`/getOneSlug/${doc.slug}`)
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('doc')
              expect(res.body.doc).to.deep.include({
                ...sampleDoc1,
                thumbnail: 'news/thumbnails/tinkoff.png'
              })
              done()
            })
        })
    })

    it('with cb', done => {
      app.use('/getOneCb', createApi(
        NewsEntity,
        {
          method: 'getOne',
          cb: (req, res, doc) => doc.incrementViews()
        },
        true
      ))

      new NewsEntity(sampleDoc1)
        .save()
        .then(doc => {
          chai
            .request(app)
            .get(`/getOneCb/${doc.slug}`)
            .then(res => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('doc')
              expect(res.body.doc).to.deep.include({ views: 1 })
              done()
            })
        })
    })
  })

  describe('PUT', () => {
    it('updates doc', done => {
      app.use('/put', createApi(NewsEntity, 'update', true))

      new NewsEntity(sampleDoc1)
        .save()
        .then(doc => {
          chai
            .request(app)
            .put(`/put/${doc.slug}`)
            .send({ views: 100 })
            .end((err, res) => {
              expect(res).to.have.property('status').eql(200)
              expect(res).to.have.property('body')
              expect(res.body).to.have.property('doc')
              expect(res.body.doc).to.deep.include({ views: 100 })
              done()
            })
        })
    })
  })

  describe('POST', () => {
    it('posts doc', done => {
      app.use('/post', createApi(NewsEntity, 'post'))

      chai
        .request(app)
        .post('/post')
        .send(sampleDoc1)
        .end((err, res) => {
          expect(res).to.have.property('status').eql(200)
          expect(res).to.have.property('body')
          expect(res.body).to.have.property('doc')
          expect(res.body.doc).to.deep.include({
            ...sampleDoc1,
            thumbnail: 'news/thumbnails/tinkoff.png'
          })

          done()
        })
    })
  })

  describe('DELETE', () => {
    it.only('deletes doc', done => {
      app.use('/delete', createApi(NewsEntity, 'del', true))

      new NewsEntity(sampleDoc1)
       .save()
       .then(doc => {
         chai
          .request(app)
          .delete(`/delete/${doc.slug}`)
          .then(res => {
            NewsEntity
              .findById(doc._id)
              .then(doc => {
                expect(doc).to.not.exist
                done()
              })
          })
       })
    })
  })
})
