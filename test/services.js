const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../app')
const expect = chai.expect

const Service = mongoose.model('Service')
const ServiceCategory = mongoose.model('ServiceCategory')

chai.use(chaiHttp)

describe('Service', () => {
  const sampleCategory = {
    title: 'Терапия',
    order: 5
  }

  const sampleService = {
    title: 'Анализ ОПТГ',
    price: 400,
    isSocial: false,
    order: 14
  }

  after(() => {
    Service.remove()
    ServiceCategory.remove()
  })

  let categoryId
  it('creates and saves category', done => {
    new ServiceCategory(sampleCategory)
      .save()
      .then(doc => {
        expect(doc).to.deep.include(sampleCategory)
        categoryId = doc._id
        done()
      })
  })

  it('creates and saves service', done => {
    new Service({
      ...sampleService,
      category: categoryId
    })
      .save()
      .then(doc => {
        expect(doc).to.deep.include({
          ...sampleService,
          category: categoryId
        })
        done()
      })
  })
})
