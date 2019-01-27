require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const allowedOrigins = 'https://floob.club:* https://www.floob.club:* http://localhost:*'
const mongoose = require('mongoose')

const VideoController = require('./controllers/VideoController')
const RoomController = require('./controllers/RoomController')
// Connect to Database
mongoose.connect(process.env.API_FLOOB_MONGOURL, {
  useNewUrlParser: true
}, function (error) {
  if (!error) {
    console.log('Mongo is running')
  }
})
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

const server = app.listen(3000, function () {
  console.log('server running on port 3000')
})

const io = require('socket.io')(server, {
  origins: allowedOrigins,
  secure: true
})

// <----------------------------Socket Functions----------------------------> //\

function sendMessage (socket, message, type) {
  socket.emit('message', {
    type: type,
    message: message
  })
}

function newUser (socket, payload) {
  const {
    roomID
  } = payload
  VideoController.getAll(roomID).then(result => {
    socket.emit('getVideos', result)
  })
  RoomController.addToRoom(payload, socket.id)
}

function addVideo (payload) {
  VideoController.add(payload).then(result => {
    VideoController.getAll(payload.roomID).then(videoResult => {
      io.sockets.in(payload.roomID).emit('getVideos', videoResult)
    })
  })
}

function removeVideo (payload) {
  VideoController.removeVideo(payload).then(result => {
    if (result) {
      VideoController.getAll(payload.roomID).then(videoResult => {
        io.sockets.in(payload.roomID).emit('getVideos', videoResult)
      })
    }
  })
    .catch(error => {
      console.log(error)
    })
}

function voteToSkip (payload) {
  let roomCount = io.nsps['/'].adapter.rooms[payload.roomID]
  let votesNeeded = 0
  // Check if roomcount is defined
  if (roomCount) {
    votesNeeded = (roomCount.length / 2)
  }
  VideoController.voteToSkip(payload, votesNeeded).then(result => {
    switch (result) {
      case 'Already Voted':
        break
        // If deleted, get videos again and send to room.
      case 'Video Deleted':
        VideoController.getAll(payload.roomID).then(videoResult => {
          io.sockets.in(payload.roomID).emit('getVideos', videoResult)
        })
        break
        // Default vote added, send back video with updated skipCounter
      default:
        io.sockets.in(payload.roomID).emit('voteAdded', result)
        break
    }
  })
}
// <----------------------------Socket Functions----------------------------> //

// <----------------------------Socket.io Listeners----------------------------> //
io.on('connection', (socket) => {
  socket.on('newRoom', (payload) => {
    const {
      roomID
    } = payload
    socket.join(roomID)
    newUser(socket, payload)
  })

  socket.on('addVideo', payload => {
    addVideo(payload)
  })
  socket.on('voteToSkip', payload => {
    voteToSkip(payload)
  })
  socket.on('removeVideo', payload => {
    removeVideo(payload)
  })
  socket.on('leaveRoom', socketID => {
    RoomController.removeFromRoom(socketID)
  })
  socket.on('disconnect', () => {
    RoomController.removeFromRoom(socket.id)
  })
})
// <----------------------------Socket.io Listeners----------------------------> //
