const { users, current_viewers } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { signUser } = require('../config/auth')
const {
  passwordResetEmail,
  welcomeEmail
} = require('../controllers/MailController')
const jwtSecret = require('../config/config').authentication.jwtSecret
const salt = require('../config/config').authentication.salt
const sgMail = require('@sendgrid/mail')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
sgMail.setApiKey(process.env.API_FLOOB_SENDGRIDAPI)

users.hasMany(current_viewers, {
  foreignKey: 'room',
  as: '1',
  sourceKey: 'id'
})
current_viewers.belongsTo(users, {
  foreignKey: 'room',
  as: '2',
  sourceKey: 'id'
})

function tokenLogin(token, res) {
  try {
    decoded = jwt.verify(token, jwtSecret).user
    let username = decoded.username.toLowerCase()
    let password = decoded.password
    users
      .findOne({
        active: 1,
        username: username,
        password: password
      })
      .then(response => {
        if (!response) {
          return res.send({
            error: true,
            type: 'error',
            message: 'Username or Password is incorrect'
          })
        } else {
          let token = signUser(response)
          let user = {
            id: response.id,
            email: response.email,
            username: response.username
          }
          return res.send({
            token: token,
            user: user
          })
        }
      })
  } catch (err) {
    return res.send({
      error: true,
      type: 'error',
      message: err
    })
  }
}

module.exports = {
  register(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'No Information submitted'
      })
    }
    users
      .findOne({
        where: {
          [Op.or]: [
            {
              username_lowercase: req.body.username.toLowerCase()
            },
            {
              email_lowercase: req.body.email.toLowerCase()
            }
          ]
        }
      })
      .then(user => {
        if (user) {
          return res.send({
            error: true,
            type: 'error',
            message: 'User already exsists'
          })
        } else {
          req.body.password = bcrypt.hashSync(req.body.password, salt)
          users.create(req.body).then(response => {
            let token = signUser(response)
            let user = {
              id: response.id,
              email: response.email,
              username: response.username
            }
            welcomeEmail(response.email)
            return res.send({
              token: token,
              user: user
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
        return res.send({
          error: true,
          type: 'error',
          message: err
        })
      })
  },
  login(req, res) {
    //If no post data is sent, return error
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Error'
      })
    }
    //Check for token login
    if (req.body.token) {
      tokenLogin(req.body.token, res)
    } else {
      users
        .findOne({
          where: {
            [Op.or]: [
              { email_lowercase: req.body.username.toLowerCase() },
              { username_lowercase: req.body.username.toLowerCase() }
            ]
          }
        })
        .then(response => {
          if (!response) {
            return res.send({
              error: true,
              type: 'error',
              message: 'Username or Password is incorrect'
            })
          } else {
            let passwordMatch = bcrypt.compareSync(
              req.body.password,
              response.password
            )
            if (passwordMatch) {
              let token = signUser(response)
              let user = {
                id: response.id,
                email: response.email,
                username: response.username
              }
              return res.send({
                token: token,
                user: user
              })
            } else {
              return res.send({
                error: true,
                type: 'error',
                message: 'Username or Password is incorrect'
              })
            }
          }
        })
    }
  },
  requestPasswordChange(req, res) {
    if (!req.body.username) {
      return res.send({
        error: true,
        message: 'Please fill out all fields',
        type: 'error'
      })
    }
    let token = jwt.sign(
      {
        username: req.body.username
      },
      jwtSecret,
      {
        expiresIn: '30m'
      }
    )
    users
      .update(
        {
          reset_token: token
        },
        {
          where: {
            [Op.or]: [
              { email_lowercase: req.body.username.toLowerCase() },
              { username_lowercase: req.body.username.toLowerCase() }
            ]
          }
        }
      )
      .then(user => {
        //If no user found. Return generic message
        if (!user[0]) {
          return res.send({
            error: false,
            type: 'success',
            message: 'Thank you a password reset has to been sent'
          })
        } else {
          users
            .findOne({
              where: {
                reset_token: token
              }
            })
            .then(result => {
              passwordResetEmail(
                result.email,
                result.username,
                result.reset_token
              )
              return res.send({
                error: false,
                type: 'success',
                message: 'Thank you a password reset has to been sent'
              })
            })
            .catch(error => {
              console.error(error)
            })
        }
      })
      .catch(error => {
        return res.send({
          error: true,
          type: 'error',
          message: error
        })
      })
  },
  getUsers(req, res) {
    users
      .findAll({
        include: [
          {
            model: current_viewers,
            as: '1'
          }
        ]
      })
      .then(result => {
        return res.send(result)
      })
      .catch(error => {
        console.error(error)
      })
  },
  changePassword(req, res) {
    if (!req.body) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Please try again'
      })
    }
    if (req.body.password !== req.body.confirmPassword) {
      return res.send({
        error: true,
        type: 'error',
        message: 'Passwords do not match'
      })
    }
    //Decode token to get email
    jwt.verify(req.body.token, jwtSecret, function(err, decoded) {
      if (!decoded) {
        return res.send({
          error: true,
          type: 'error',
          message: 'Token has expired. Please resend password reset.'
        })
      } else {
        let newPassword = bcrypt.hashSync(req.body.password, salt)
        users
          .update(
            {
              password: newPassword
            },
            {
              where: {
                [Op.or]: [
                  {
                    username_lowercase: decoded.username.toLowerCase()
                  },
                  {
                    email_lowercase: decoded.username.toLowerCase()
                  }
                ],
                reset_token: req.body.token
              }
            }
          )
          .then(result => {
            //if no user found, return error
            if (!result[0]) {
              return res.send({
                error: true,
                type: 'error',
                message: 'Error updating password. Please try to reset again.'
              })
            } else {
              return res.send({
                error: false,
                type: 'success',
                message: 'Password reset. Please login again'
              })
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    })
  }
}
