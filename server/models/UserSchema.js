const mongoose = require('mongoose');

const Users = mongoose.Schema({
    name: { type: String, required:true},
    username: { type: String, required:true},
    email: { type: String, required:true},
    password: { type: String, minlength:8, required: true},
    socketID: { type: String},
  });

  module.exports =  mongoose.model('Users', Users)