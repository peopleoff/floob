const mongoose = require('mongoose')

const Room = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  nsfw:{
    type: Boolean,
    default: false
  },
  createdBy: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: 1
  },
  currentUsers: [],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Room', Room)
