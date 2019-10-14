const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = Schema({
  videoID: {
    type: String,
    required: true
  },
  roomID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  channel: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  skipCounter: [],
  username: {
    type: String,
    required: false
  },
  userID: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
})

module.exports = mongoose.model('Video', videoSchema)
