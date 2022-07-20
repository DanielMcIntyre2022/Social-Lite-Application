const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const app = express(); //alias from the express function
app.use(cors);
const axios = require('axios');

// make a get request to retive the email user data // 

app.get("/", (req, res) => {

  const config = {
    method: 'GET',
    url: 'http://localhost:4000'
  };
  axios(config)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
  })
});

// sendgrid details //

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { config } = require('dotenv');
const apikey = process.env.SENDGRID_API_KEY
sgMail.setApiKey(apikey);
const msg = {
  to: 'daniel-mcintyre@hotmail.com',
  from: 'socialliteeventservices@gmail.com', 
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

app.listen(4000,  () => console.log("koki"));

