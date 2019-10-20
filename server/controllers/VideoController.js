const {videos} = require("../models");
const { getVideoID, getVideoInfo } = require("../functions");

module.exports = {
  getAll(id) {
    return new Promise((resolve, reject) => {
      videos
        .findAll({
          where: {
            roomID: id
          },
          order: [
            ['createdAt', 'DESC'],
          ]
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
          console.log(videoInfo);
          let newVideo = {

          };
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  async voteToSkip(payload, votesNeeded) {
    // Get video first to check current skip counter
    let video = await Video.findById(payload.video._id);

    return new Promise((resolve, reject) => {
      // Function to check if user already skipped
      function alreadySkipped() {
        return video.skipCounter.includes(payload.username);
      }
      // If user already skipped, return and do nothing.
      if (alreadySkipped()) {
        return resolve("Already Voted");
      }

      // If user hasn't voted on video yet, add one to video's skip counter for current action.
      // If skip counter is higher then votes needed, skip video.
      if (video.skipCounter.length + 1 >= votesNeeded) {
        Video.deleteOne(
          {
            _id: payload.video._id
          },
          (error, video) => {
            if (error) return reject(error);
            if (video) return resolve("Video Deleted");
          }
        );
      } else {
        // Default, add user to skip counter.
        Video.findOneAndUpdate(
          {
            _id: payload.video._id
          },
          {
            $push: {
              skipCounter: payload.username
            }
          },
          {
            new: true
          },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          }
        );
      }
    });
  },
  searchVideos(payload) {},
  removeVideo(payload) {
    return new Promise((resolve, reject) => {
      Video.deleteOne(
        {
          _id: payload._id
        },
        (error, result) => {
          if (error) {
            return reject(error);
          } else {
            if (result) {
              resolve(result);
            } else {
              resolve(false);
            }
          }
        }
      );
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
