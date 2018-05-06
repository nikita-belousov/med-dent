const mongoose = require('mongoose')
const slug = require('slug')

const moment = require('moment')
moment.locale('ru')

const IMAGE_PATH = 'staff/'

const DentistSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  about: {
    required: true,
    type: String
  },
  positions: {
    required: true,
    type: [String]
  },
  experience: {
    required: true,
    type: String,
    set: year => moment(year, 'YYYY')
      .fromNow()
      .split(' ')
      .slice(0, -1)
      .join(' ')
  },
  imageFolder: {
    required: true,
    type: String,
    set: val => IMAGE_PATH + val
  }
}, { timestamps: true })

DentistSchema.methods.toSelectOptionJSON = function() {
  return {
    id: this._id,
    name: this.name,
    positions: this.positions
  }
}

mongoose.model('Dentist', DentistSchema)
