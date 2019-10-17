require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  send() {
    const msg = {
      to: "ruslanbelyy@gmail.com",
      from: "ruslan@floob.gg",
      templateId: "d-b7270eebc96d434baec84070b4af7c43",
      dynamic_template_data: {
        username: "Testing Templates",
        token: "Some One"
      }
    };
    sgMail
      .send(msg)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error.response.body);
      });
  }
};
