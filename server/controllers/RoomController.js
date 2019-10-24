const { rooms, users_rooms } = require('../models')

module.exports = {
  getAll(req, res) {
    let publicRooms = []
    let favoriteRooms = []
    //First find all public rooms
    rooms
      .findAll()
      .then(result => {
        //Set result to global var
        publicRooms = result
        //Next find all rooms for user if logged in.
        users_rooms.findAll({
          where: {
            user: req.body.user
          }
        }).then(response => {
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
      name: req.body.name,
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
          room: response.roomID
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
