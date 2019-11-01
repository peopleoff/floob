const { rooms, users_rooms, users, current_viewers } = require('../models')
const Sequelize = require('sequelize')
const fs = require('fs')

users_rooms.belongsTo(users, { as: 'roomUser', foreignKey: 'user' })
users_rooms.belongsTo(rooms, { as: 'roomInfo', foreignKey: 'room' })

rooms.hasMany(current_viewers, { foreignKey: 'room' })
current_viewers.belongsTo(rooms, { as: 'viewerInfos', foreignKey: 'room' })

fs.readFile('./wordLists/commonWords.json', handleFile)
let wordList
// Write the callback function
function handleFile(err, data) {
  if (err) throw err
  wordList = JSON.parse(data)
}
function randomName() {
  let random = Math.floor(Math.random() * Math.floor(1000))
  let random2 = Math.floor(Math.random() * Math.floor(1000))
  return wordList[random] + ' ' + wordList[random2]
}
module.exports = {
  getAll(req, res) {
    let publicRooms = []
    let favoriteRooms = []
    console.log(req.body)
    //First find all public rooms
    rooms
      .findAll({
        include: [
          {
            model: current_viewers
          }
        ]
      })
      .then(result => {
        //Set result to global var
        publicRooms = result.sort(function (one, other) {
          //a - b is 
          //   0 when elements are the same
          //  >0 when a > b
          //  <0 when a < b
          return  other.current_viewers.length - one.current_viewers.length;
       });
        return res.send({
          publicRooms: publicRooms,
          favoriteRooms: favoriteRooms
        })
        // if (!req.body.user) {
        // }
        //Next find all rooms for user if logged in.
        // users_rooms
        //   .findAll({
        //     where: {
        //       user: req.body.user
        //     },
        //     include: [
        //       {
        //         model: users,
        //         as: 'roomUser'
        //       },
        //       {
        //         model: rooms,
        //         as: 'roomInfo'
        //       }
        //     ]
        //   })
        //   .then(response => {
        //     //Set result to global var
        //     favoriteRooms = response
        //     //Send global vars
        //     return res.send({
        //       publicRooms: publicRooms,
        //       favoriteRooms: favoriteRooms
        //     })
        //   })
      })
      .catch(error => {
        return res.send({
          error: true,
          type: 'error',
          message: error
        })
      })
  },
  getInfo(req, res) {
    rooms
      .findOne({
        where: {
          id: req.body.id
        },
        raw: true
      })
      .then(result => {
        if (req.body.user) {
          if (result.user === req.body.user.id) {
            result.roomOwner = true
          }
        }
        return res.send({
          room: result
        })
      })
      .catch(error => {
        return res.send({
          error: true,
          type: 'error',
          message: error
        })
      })
  },
  addToRoom(payload, socketID) {
    let userID = null
    if (payload.user) {
      userID = payload.user.id
    }

    let newUser = {
      user: userID,
      room: payload.roomID,
      socketID: socketID
    }

    current_viewers
      .create(newUser)
      .then(result => {
        console.log('User Added')
      })
      .catch(error => {
        console.error(error)
      })
  },
  removeFromRoom(payload, socketID) {
    current_viewers.destroy({
      where: {
        socketID: socketID,
        room: payload.roomID
      }
    })
  },
  updateRoom(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Error'
      })
    }
    rooms
      .update(req.body.room, {
        where: {
          id: req.body.room.id
        }
      })
      .then(result => {
        if (result) {
          return res.send({
            error: false,
            type: 'success',
            message: 'Room Updated!'
          })
        }
      })
      .catch(error => {
        return res.send({
          error: true,
          type: 'error',
          message: error
        })
      })
  },
  register(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Error'
      })
    }
    let newRoom = {
      name: randomName(),
      user: req.body.userID
    }
    rooms
      .create(newRoom)
      .then(response => {
        users_rooms
          .create({
            user: req.body.userID,
            room: response.id
          })
          .then(createdResponse => {
            return res.send({
              error: false,
              room: response.id
            })
          })
          .catch(createdError => {
            console.error(createdError)
          })
      })
      .catch(error => {
        console.error(error)
      })
  },
  toggleRoom(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Error'
      })
    }
    users_rooms
      .findOne({
        where: {
          user: req.body.user,
          room: req.body.room
        }
      })
      .then(response => {
        //If room found, delete record
        if (response) {
          users_rooms
            .destroy({
              where: {
                user: req.body.user,
                room: req.body.room
              }
            })
            .then(deletedResponse => {
              if (deletedResponse) {
                return res.send({
                  error: false,
                  type: 'success',
                  message: 'Room Removed!'
                })
              }
            })
            .catch(deletedError => {
              console.error(deletedError)
            })
        } else {
          users_rooms
            .create(req.body)
            .then(createdResponse => {
              if (createdResponse) {
                return res.send({
                  error: false,
                  type: 'success',
                  message: 'Room Added!'
                })
              }
            })
            .catch(createdError => {
              console.error(createdError)
            })
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}
