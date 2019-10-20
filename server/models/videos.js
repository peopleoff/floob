// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const videoSchema = Schema({
//   videoID: {
//     type: String,
//     required: true
//   },
//   roomID: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     required: false
//   },
//   channel: {
//     type: String,
//     required: false
//   },
//   image: {
//     type: String,
//     required: false
//   },
//   skipCounter: [],
//   username: {
//     type: String,
//     required: false
//   },
//   userID: {
//     type: String,
//     required: false
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//     required: true
//   }
// })

// module.exports = mongoose.model('Video', videoSchema)

module.exports = function(sequelize, DataTypes) {
  const videos = sequelize.define(
    "videos",
    {
      videoID: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      roomID: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      channel: {
        type: DataTypes.STRING(500),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(500),
        allowNull: true
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        }
      },
      skipCounter: {
        type: DataTypes.STRING(3000),
        get: function() {
          return JSON.parse(this.getDataValue("skipCounter"));
        },
        set: function(val) {
          return this.setDataValue("skipCounter", JSON.stringify(val));
        }
      }
    },
    {
      tableName: "videos",
      paranoid: true,
      timestamps: true,
    }
  );

  return videos;
};
