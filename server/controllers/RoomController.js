const { rooms, users_rooms, users } = require('../models')
const Sequelize = require('sequelize')
const fs = require('fs')

users_rooms.belongsTo(users, { as: 'roomUser', foreignKey: 'user' })
users_rooms.belongsTo(rooms, { as: 'roomInfo', foreignKey: 'room' })

fs.readFile('./wordLists/commonWords.json', handleFile)
let wordList;
// Write the callback function
function handleFile(err, data) {
  if (err) throw err
  wordList = JSON.parse(data)
}
function randomName(){
  let random = Math.floor(Math.random() * Math.floor(1000));
  let random2 = Math.floor(Math.random() * Math.floor(1000));
  return wordList[random] + ' ' + wordList[random2];
}
module.exports = {
  getAll(req, res) {
    let publicRooms = []
    let favoriteRooms = []
    //First find all public rooms
    rooms
      .findAll({
        where: Sequelize.literal('')
      })
      .then(result => {
        //Set result to global var
        publicRooms = result
        //Next find all rooms for user if logged in.
        users_rooms
          .findAll({
            include: [
              {
                model: users,
                as: 'roomUser'
              },
              {
                model: rooms,
                as: 'roomInfo'
              }
            ]
          })
          .then(response => {
            //Set result to global var
            favoriteRooms = response
            //Send global vars
            return res.send({
              publicRooms: publicRooms,
              favoriteRooms: favoriteRooms
            })
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
  getInfo(req, res) {
    console.log(req.body)
    rooms
      .findOne({
        where: {
          id: req.body.id
        },
        raw: true
      })
      .then(result => {
        if (req.body.user) {
          if (result.createdBy === req.body.user.id) {
            result.roomOwner = true
          }
        }
        console.log(result)
        console.log('in here')
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
    const { roomID, username } = payload
    rooms
      .update(
        {
          currentUsers: username
        },
        {
          where: {
            id: roomID
          }
        }
      )
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.error(error)
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
      description: req.body.description,
      nsfw: req.body.nsfw,
      createdBy: req.body.userID,
      type: req.body.roomType
    }
    rooms
      .create(newRoom)
      .then(response => {
        return res.send({
          error: false,
          room: response.id
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
