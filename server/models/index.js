const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');
const auth = require('../auth.json');
const db = {};
Mongoose.Promise = global.Promise;

const mongoose = Mongoose.connect(auth.MongoURL,{useNewUrlParser: true}, function(err, response){
    if(err){
        console.log(err);
    }else{
        console.log("Connected");
    }
});

fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = path.join(__dirname, file);
        db[model.name] = model
    });
db.mongoose = mongoose;

module.exports = db;