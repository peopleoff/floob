const Video = require('../models/videos')
const {
  getVideoID,
  getVideoInfo
} = require('../functions')
const {catchError} = require('../functions')

module.exports = {
  getAll (id) {
    return new Promise(resolve => {
      Video.find({
        roomID: id
      }, null, {
        sort: {
          date: 1
        }
      }, (error, result) => {
        if (error) {
          return error
        }
        resolve(result)
      })
    })
  },
  add (payload) {
    return new Promise((resolve, reject) => {
      const {
        videoLink,
        roomID,
        user
      } = payload
      let videoID = getVideoID('v', videoLink)
      getVideoInfo(videoID)
      .then(result => {
        let videoInfo = result.data.items[0].snippet
        let newVideo = new Video({
          videoID: videoID,
          roomID: roomID,
          title: videoInfo.title,
          channel: videoInfo.channelTitle,
          image: videoInfo.thumbnails.default.url,
          username: user.username
        })
        newVideo.save((error, result) => {
          if (error) {
            reject(error)
          }
          resolve(result)
        })
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  async voteToSkip (payload, votesNeeded) {
    // Get video first to check current skip counter
    let video = await Video.findById(payload.video._id)

    return new Promise((resolve, reject) => {
      // Function to check if user already skipped
      function alreadySkipped () {
        return video.skipCounter.includes(payload.username)
      }
      // If user already skipped, return and do nothing.
      if (alreadySkipped()) {
        return resolve('Already Voted')
      };

      // If user hasn't voted on video yet, add one to video's skip counter for current action.
      // If skip counter is higher then votes needed, skip video.
      if ((video.skipCounter.length + 1) >= votesNeeded) {
        Video.deleteOne({
          _id: payload.video._id
        }, (error, video) => {
          if (error) return reject(error)
          if (video) return resolve('Video Deleted')
        })
      } else {
        // Default, add user to skip counter.
        Video.findOneAndUpdate({
          _id: payload.video._id
        }, {
          $push: {
            skipCounter: payload.username
          }
        }, {
          new: true
        }, (error, result) => {
          if (error) return reject(error)
          return resolve(result)
        })
      }
    })
  },
  removeVideo (payload) {
    return new Promise((resolve, reject) => {
      Video.deleteOne({
        _id: payload._id
      }, (error, result) => {
        if (error) {
          return reject(error)
        } else {
          if (result) {
            resolve(result)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
