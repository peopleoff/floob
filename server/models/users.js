const mongoose = require('mongoose')

const User = mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
    default: 1
  },
  username: {
    type: String,
    lowercase: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  resettoken: {
    type: String
  },
  token: {
    type: String
  },
  socketID: {
    type: String
  }
})

module.exports = mongoose.model('User', User)
