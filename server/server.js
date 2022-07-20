const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const app = express(); //alias from the express function
app.use(cors);
const axios = require('axios');
const http = require('http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');

  server.get("/", (req, res) => {
  const configEmail = {
    method: 'GET',
    url: 'https://localhost:4000'
  };
  axios(configEmail)
    .then((response) => {
      console.log(response)
      res.json(response);
      console.log(response);
  })
});

});

// sendgrid details //

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

