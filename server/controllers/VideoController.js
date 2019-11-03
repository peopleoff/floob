const { videos, vote_to_skip } = require("../models");
const { getVideoID, getVideoInfo } = require("../functions");

module.exports = {
  getAll(id) {
    return new Promise((resolve, reject) => {
      videos
        .findAll({
          where: {
            roomID: id
          },
          order: [["createdAt", "ASC"]]
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  add(payload) {
    return new Promise((resolve, reject) => {
      const { videoLink, roomID, pure, user } = payload;
      videoID = "";
      //Pure means Pure video ID was passed
      if (pure) {
        videoID = videoLink;
      } else {
        videoID = getVideoID("v", videoLink);
      }
      getVideoInfo(videoID)
        .then(result => {
          let videoInfo = result.data.items[0].snippet;
          console.log(videoInfo.thumbnails);
          let newVideo = {
            videoID: videoID,
            roomID: roomID,
            title: videoInfo.title,
            channel: videoInfo.channelTitle,
            image: videoInfo.thumbnails.high.url,
            user: user.id
          };
          videos
            .create(newVideo)
            .then(result => {
              resolve(result);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async voteToSkip(payload, votesNeeded) {
    //Check if user has already skipped video
    let userVoted = await vote_to_skip.findOrCreate({
      defaults: payload,
      where: {
        video: payload.video,
        room: payload.room,
        user: payload.user
      }
    });
    let currentVotes = await vote_to_skip.findAndCountAll({
      where: {
        video: payload.video,
        room: payload.room
      }
    });
    return new Promise((resolve, reject) => {
      // userVoted[1] returns if a new record is created
      //If no new record is created User already votted
      if (!userVoted[1]) {
        reject({
          error: true,
          type: "error",
          message: "You've Already Voted!"
        });
      };
      if (currentVotes.count > votesNeeded) {
        removeVideo(payload.video)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        })
      }
    });

    // return new Promise((resolve, reject) => {
    //   // Function to check if user already skipped
    //   function alreadySkipped() {
    //     return video.skipCounter.includes(payload.username);
    //   }
    //   // If user already skipped, return and do nothing.
    //   if (alreadySkipped()) {
    //     return resolve("Already Voted");
    //   }

    //   // If user hasn't voted on video yet, add one to video's skip counter for current action.
    //   // If skip counter is higher then votes needed, skip video.
    //   if (video.skipCounter.length + 1 >= votesNeeded) {
    //     Video.deleteOne(
    //       {
    //         _id: payload.video._id
    //       },
    //       (error, video) => {
    //         if (error) return reject(error);
    //         if (video) return resolve("Video Deleted");
    //       }
    //     );
    //   } else {
    //     // Default, add user to skip counter.
    //     Video.findOneAndUpdate(
    //       {
    //         _id: payload.video._id
    //       },
    //       {
    //         $push: {
    //           skipCounter: payload.username
    //         }
    //       },
    //       {
    //         new: true
    //       },
    //       (error, result) => {
    //         if (error) return reject(error);
    //         return resolve(result);
    //       }
    //     );
    //   }
    // });
  },
  searchVideos(payload) {},
  removeVideo(payload) {
    return new Promise((resolve, reject) => {
      videos
        .destroy({
          where: {
            id: payload.id
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getThumbnail(req, res) {
    Video.findOne({
      roomID: req.body.roomID
    })
      .then(result => {
        if (result) {
          return res.send({
            error: false,
            image: result.image
          });
        } else {
          return res.send({
            error: false,
            image: null
          });
        }
      })
      .catch(error => {
        return res.send({
          error: true,
          message: error
        });
      });
  }
};
