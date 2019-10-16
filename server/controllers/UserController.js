const Users = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const salt = '$2a$10$Q/AH0MPPKyMVNzshASojgO'
const { signUser, decodeToken } = require('../config/auth')
const jwtSecret = require('../config/config').authentication.jwtSecret
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_FLOOB_SENDGRIDAPI)

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

module.exports = {
  async register(req, res) {
    console.log(req.body)
    if (!req.body) {
      return res.send({
        error: true,
        message: 'Please fill out all fields',
        type: 'error'
      })
    }
    let User = await Users.findOne({
      username: req.body.username
    })
    if (User) {
      return res.send({
        error: true,
        message: 'Username already exists',
        type: 'error'
      })
    }
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    let newUser = new Users(req.body)
    newUser.save((error, result) => {
      if (error) {
        return res.send({
          error: true,
          message: error,
          type: 'error'
        })
      }
      result.toJSON()
      delete result.password
      let token = signUser(result)
      let user = {
        _id: result._id,
        email: result.email,
        username: result.username
      }
      return res.send({
        token: token,
        user: user
      })
    })
  },
  login(req, res) {
    //If no post data is sent, return error
    if (!req.body) {
      return res.send({
        error: true,
        message: 'Error',
        type: 'error'
      })
    }
    req.body.username = req.body.username.toLowerCase()
    Users.findOne({
      username: req.body.username
    }).then(User => {
      if (!User) {
        return res.send({
          error: true,
          message: 'Username or Password is incorrect',
          type: 'error'
        })
      } else {
        if (
          bcrypt.compareSync(req.body.password, User.password) &&
          User.active == 1
        ) {
          User.toJSON()
          delete User.password
          let token = signUser(User)
          return res.send({
            token: token,
            user: User
          })
        } else {
          return res.send({
            error: true,
            message: 'Email or Password incorrect',
            type: 'error'
          })
        }
      }
    })
  },
  tokenLogin(req, res) {
    try {
      decoded = jwt.verify(req.body.token, jwtSecret).user
      return res.send({
        token: req.body.token,
        username: decoded.username
      })
    } catch (err) {
      return res.send({
        error: true,
        type: 'error',
        message: err
      })
    }
  },

  requestReset(req, res) {
    if (!req.body) {
      return res.send({
        message: 'Please fill out all fields',
        type: 'error'
      })
    }

    if (!validateEmail(req.body.email)) {
      return res.send({
        message: 'Invalid Email',
        type: 'error'
      })
    }

    let token = jwt.sign(
      {
        email: req.body.email
      },
      jwtSecret,
      {
        expiresIn: '30m'
      }
    )

    Users.findOneAndUpdate(
      {
        email: req.body.email
      },
      {
        resettoken: token
      }
    )
      .then(user => {
        if (user) {
          const msg = {
            to: req.body.email,
            from: 'support@floob.club',
            subject: 'Floob Password Reset',
            html: `
              Please use the following link to <a href="https://floob.club/reset/${token}"> reset your password </a>
              <br>
              If you did not request this password change please feel free to ignore it.
              <br>
          `
          }
          sgMail.send(msg)
        }
        return res.send({
          message: 'Email has been sent'
        })
      })
      .catch(error => {
        return res.send({
          message: error,
          type: 'error'
        })
      })
  },
  changePassword(req, res) {
    if (!req.body) {
      return res.send({
        message: 'Please try again',
        type: 'error'
      })
    }
    jwt.verify(req.body.token, jwtSecret, function(err, decoded) {
      if (!decoded) {
        return res.send({
          message: 'Token has expired. Please resend password reset.',
          type: 'error'
        })
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, salt)
        Users.update(
          {
            resettoken: req.body.token
          },
          {
            password: req.body.password
          }
        )
          .then(result => {
            if (result[0] !== 0) {
              return res.send({
                message: 'Your password has been succesfully changed',
                type: 'success'
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    })
  }
}
