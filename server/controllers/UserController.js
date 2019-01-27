const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = '$2a$10$Q/AH0MPPKyMVNzshASojgO'
const {
  signUser,
  decodeToken
} = require('../config/auth');

module.exports = {
  async register(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        message: "Error",
        type: "error"
      })
    }
    let User = await Users.findOne({
      email: req.body.email
    })
    if (User) {
      return res.send({
        error: true,
        message: "Email already registered",
        type: "error"
      })
    }
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    let newUser = new Users(req.body);
    newUser.save((error, result) => {
      if (error) {
        return res.send({
          error: true,
          message: error,
          type: "error"
        })
      }
      return res.send(true);
    })
  },
  async login(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        message: 'Error',
        type: 'error'
      })
    };
    let User = await Users.findOne({
      email: req.body.email
    });
    if (!User) {
      return res.send({
        error: true,
        message: 'Email or Password is incorrect',
        type: 'error'
      })
    } else {
      if (bcrypt.compareSync(req.body.password, User.password) && User.active == 1) {
        delete User.password
        let token = signUser(User);
        return res.send({
          token: token,
          username: User.username
        });
      } else {
        return res.send({
          error: true,
          message: 'Username or Password incorrect',
          type: "error"
        });
      }
    }
  }
}