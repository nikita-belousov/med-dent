const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

mongoose.model('Role', RoleSchema)
