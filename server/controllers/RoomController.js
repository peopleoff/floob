const { rooms } = require("../models");

module.exports = {
  getAll(req, res) {
    rooms
      .findAll()
      .then(result => {
        return res.send({
          error: false,
          result: result
        });
      })
      .catch(error => {
        return res.send({
          error: true,
          type: "error",
          message: error
        });
      });
  },
  addToRoom(payload, socketID) {
    console.log(payload, socketID);
    const { roomID, username } = payload;
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
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
    // Room.findOneAndUpdate(
    //   {
    //     _id: roomID
    //   },
    //   {
    //     $push: {
    //       currentUsers: {
    //         socketID: socketID,
    //         username: username
    //       }
    //     }
    //   },
    //   {
    //     returnOriginal: false
    //   },
    //   (error, result) => {
    //     if (error) {
    //       // console.log(error);
    //     } else {
    //       // console.log(result);
    //     }
    //   }
    // );
  },
  register(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: "error",
        message: "Error"
      });
    }
    let newRoom = {
      name: req.body.name,
      description: req.body.description,
      nsfw: req.body.nsfw,
      createdBy: req.body.userID,
      type: req.body.roomType
    };
    rooms.create(newRoom)
    .then(response => {
      return res.send({
        error: false,
        room: response.roomID
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
};
