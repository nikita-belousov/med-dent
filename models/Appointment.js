const mongoose = require('mongoose')

const AppointmentSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  phone: {
    required: true,
    type: String
  },
  dentist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dentist'
  },
  problem: {
    required: true,
    type: String
  }
}, { timestamps: true })

mongoose.model('Appointment', AppointmentSchema)
