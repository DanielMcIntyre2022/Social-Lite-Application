const express = require("express"); //needed to launch server
const cors = require("cors"); //needed to disable sendgrid security
const app = express(); //alias from the express function
app.use(cors());

const hostname = "127.0.0.1";
const port = 4000;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

app.post("/", cors(corsOptions), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const emailInfo = req.body.emailUserInput;
  console.log(emailInfo);
  res.json(emailInfo);

  // sendgrid details //

  require("dotenv").config();
  const sgMail = require("@sendgrid/mail");
  const apikey = process.env.SENDGRID_API_KEY;
  sgMail.setApiKey(apikey);
  const msg = {
    to: emailInfo,
    from: "daniel-mcintyre@hotmail.com",
    subject: "Congratulations! Your event link has been created!",
    text: `Here is your event link:`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  // email sending logic //

  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
