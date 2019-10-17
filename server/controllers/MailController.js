require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  send(recipient) {
    // const msg = {
    //   to: "ruslanbelyy@gmail.com",
    //   from: "ruslan@floob.gg",
    //   templateId: "d-b7270eebc96d434baec84070b4af7c43",
    //   dynamic_template_data: {
    //     username: "Testing Templates",
    //     token: "Some One"
    //   }
    // };
    const msg = {
      to: recipient,
      from: {
        email: 'support@floob.gg',
        name: 'Floob Support'
      },
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(result => {
        console.log(result[0].complete);
      })
      .catch(error => {
        console.error(error.response.body);
      });
  }
};
