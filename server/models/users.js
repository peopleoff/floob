// const mongoose = require('mongoose')

// const User = mongoose.Schema({
//   active: {
//     type: Boolean,
//     required: true,
//     default: 1
//   },
//   username: {
//     type: String,
//     required: true
//   },
//   username_lowercase: {
//     type: String,
//     lowercase: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   email_lowercase: {
//     type: String,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     minlength: 8,
//     required: true
//   },
//   resettoken: {
//     type: String
//   },
//   token: {
//     type: String
//   },
//   socketID: {
//     type: String
//   }
// })

// User.pre('save', function (next) {
//   this.username_lowercase = this.get('username');
//   next();
// });

// User.pre('save', function (next) {
//   this.email_lowercase = this.get('email');
//   next();
// });

// module.exports = mongoose.model('User', User)

module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      username: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      username_lowercase: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      email_lowercase: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
      type: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: "user_types",
          key: "id"
        }
      },
      token: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      socketID: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      reset_token: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    },
    {
      tableName: "users",
      paranoid: true,
      timestamps: true,
    }
  );

  users.beforeCreate(function(user, options) {
    user.username_lowercase = user.username.toLowerCase();
    user.email_lowercase = user.email.toLowerCase();
    return user;
  });

  return users;
};
