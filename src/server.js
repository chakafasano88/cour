const express = require("express");
const app = express();
require('dotenv').config()
const PORT = 3000;
const helmet = require("helmet");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

app.use(helmet());

app.use(cors({ credentials: true }));

app.use(express.json());

app.post("/email",  async (req, res, next) => {
  try {
    const { email } = req.body;

    sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

    const mailRes = {
      to: 'matt.fasano88@gmail.com',
      from: "will@cour.studio",
      subject: "Cour mailing list",
      text: "Maling List",
      html: `${email} said, "Lets party in miami and get COVID!"`,
    };

    const sendGridResponse = await sgMail.send(mailRes)

    res.status(200).send('Email sent successfully');
  
  } catch (err) {
    next(err.response.body.errors[0].message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
