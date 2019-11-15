require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.API_FLOOB_SENDGRIDAPI)

module.exports = {
  passwordResetEmail(recipient, username, token) {
    console.log("here");
    console.log(token);
    const msg = {
      to: {
        email: recipient
      },
      from: {
        name: 'Support Floob',
        email: 'Support@floob.gg'
      },
      templateId: 'd-b7270eebc96d434baec84070b4af7c43',
      dynamic_template_data: {
        subject: 'Floob Password Reset',
        username: username,
        reset_link: `https://Floob.gg/passwordReset/${token}`
      }
    }
    sgMail
      .send(msg)
      .then(result => {
        console.log(result[0].complete);
      })
      .catch(error => {
        console.error(error)
      })
  },
  welcomeEmail(recipient) {
    const msg = {
      to: {
        email: recipient
      },
      from: {
        name: 'Support Floob',
        email: 'Support@floob.gg'
      },
      templateId: 'd-c30d2b4f5aeb47c49626629dc0d96a94',
      dynamic_template_data: {
        subject: 'Welcome to Floob!'
      }
    }
    sgMail
      .send(msg)
      .then(result => {
        console.log(result[0].complete)
      })
      .catch(error => {
        console.error(error.response.body)
      })
  }
}
