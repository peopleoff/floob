const Room = require('../models/rooms')
const bcrypt = require('bcryptjs')
const {catchError} = require('../functions')
const salt = '$2a$10$Q/AH0MPPKyMVNzshASojgO'

module.exports = {
  register (req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        message: ['Error'],
        type: 'danger'
      })
    };
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, salt)
    }
    let newRoom = new Room({
      name: req.body.name,
      password: req.body.password ? req.body.password : '',
      description: req.body.description,
      nsfw: req.body.nsfw,
      createdBy: req.body.username
    })
    newRoom.save((error, result) => {
      if (error) {
        return res.send(error)
      }
      return res.send(result)
    })
  },
  checkPassword (req, res) {
    Room.findById(req.body.roomID, function (err, response) {
      if (err) {
        return res.send({
          error: true,
          message: err,
          type: 'danger'
        })
      }
      if (response) {
        if (bcrypt.compareSync(req.body.password, response.password)) {
          return res.send(true)
        } else {
          return res.send(false)
        }
      } else {
        return res.send({
          error: true,
          message: ['Username or Password incorrect'],
          type: 'danger'
        })
      }
    })
  },
  getAll (req, res) {
    Room.find({
      active: 1
    }, (error, result) => {
      if (error) {
        return res.send(error)
      } else {
        return res.send(result)
      }
    })
  },
  addToRoom (payload, socketID) {
    const {
      roomID,
      username
    } = payload
    Room.findOneAndUpdate({
      _id: roomID
    }, {
      $push: {
        currentUsers: {
          socketID: socketID,
          username: username
        }
      }
    }, {
      returnOriginal: false
    }, (error, result) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(result);
      }
    })
  },
  removeFromRoom (socketID) {
    Room.findOneAndUpdate({
      currentUsers: {
        $elemMatch: {
          socketID: socketID
        }
      }
    }, {
      $pull: {
        currentUsers: {
          socketID: socketID
        }
      }
    }, {
      returnOriginal: false
    }, (error, result) => {
      if (error) {
        // console.log(error);
      } else {
        // console.log(result);
      }
    })
  }
}
