const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const app = express(); //alias from the express function

// The following is not needed, CORS middleware will be applied
// using the Apollo Server's middleware API (see further below)
// app.use(cors(corsOptions))

const hostname = '127.0.0.1';
const port = 4000;

  app.post("/", cors(), (req, res) => {
    const emailInfo = req.body.emailUserInput;
    console.log(emailInfo);
// sendgrid details //

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const apikey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(apikey);
const msg = {
  to: emailInfo,
  from: 'email', 
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
  
// email sending logic //

//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }); 
//ES8
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
    
    })


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

