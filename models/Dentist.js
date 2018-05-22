const mongoose = require('mongoose')
const { fullNameToInitials } = require('./utils')

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
  const initials = fullNameToInitials(this.name)

  return {
    optionName: `${initials} (${this.positions.slice(0, 2).join(', ')})`,
    optionValue: this._id
  }
}

mongoose.model('Dentist', DentistSchema)
