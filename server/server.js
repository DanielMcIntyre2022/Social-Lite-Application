const express = require("express"); //needed to launch server
const cors = require("cors"); //needed to disable sendgrid security
const app = express(); //alias from the express function
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const apikey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apikey);

const hostname = "127.0.0.1";
const port = 4000;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

app.post("/", cors(corsOptions), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const emailInfo = req.body.email;
  res.send(req.body.email);

  console.log(emailInfo, 'hello');

  // sendgrid details //

  const msg = {
    to: emailInfo,
    from: "socialliteeventservices@gmail.com",
    subject: "Congratulations! Your event link has been created!",
    text: `Here is your event link:`,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };
  
  sgMail.send(msg).then(() => {
    console.log("mail sent!")
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
