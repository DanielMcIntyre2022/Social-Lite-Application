const express = require('express'); //needed to launch server
const cors = require('cors'); //needed to disable sendgrid security
const app = express(); //alias from the express function
app.use(cors);

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

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(4000,  () => console.log("Running on Port 4000!"));

