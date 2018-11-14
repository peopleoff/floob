const mongoose = require('mongoose');

const VideoQue = mongoose.Schema({
    video: {
       videoID: { type: String, required:true},
       videoTitle: { type: String},
       videoChannel: { type: String}
    },
    user: {
        username: { type: String, required:true},
        socketID: { type: String},
    } 
  });

  module.exports =  mongoose.model('VideoQue', VideoQue)