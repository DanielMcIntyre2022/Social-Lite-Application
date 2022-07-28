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

const PORT = process.env.PORT;

var corsOptions = {
  origin: 'https://soicalite.netlify.app',
  optionsSuccessStatus: 200 
}

app.post("/", cors(corsOptions), (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const emailInfo = req.body.email;
  const eventInfo = req.body.eventLink;
  res.send(req.body.email);

  // sendgrid details //

  const msg = {
    to: emailInfo,
    from: "socialliteeventservices@gmail.com",
    subject: "Your social lite event link has been created! ",
    html: `<p>Hello, your event link can be found here: <a href="${eventInfo}">link</a></p>`,
  };
  
  sgMail.send(msg).then(() => {
  });
});

app.listen(PORT, () => {
  
});
