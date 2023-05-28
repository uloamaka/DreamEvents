const express = require("express");
const router = express.Router();
const config = require("../config");
const nodemailer = require("nodemailer");
const path = require("path");
const ejs = require("ejs");
const { google } = require("googleapis");

const OAuth2_client = new google.auth.OAuth2(
  config.client_id,
  config.client_secret,
  "https://developers.google.com/oauthplayground" // Redirect URL
);
OAuth2_client.setCredentials({ refresh_token: config.refresh_token });

 router.post("/", async (req, res) => {
  const accessToken = await OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.client_id,
      clientSecret: config.client_secret,
      refreshToken: config.refresh_token,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail_options = {
    from: ` The G.O.A.T <${config.user}> `,
    to: "ebitegift235@gmail.com", // Modify this line to include the recipient's email address
    subject: `A Message from The G.O.A.T`,
    html: "<p>Hello world!</p>", // Modify this line to include the content of your email
  };

  transport.sendMail(mail_options, function (err, result) {
    if (err) {
      console.log(`Error: `, err);
    } else {
      console.log(`Success: `, result);
    }
    transport.close();
  });
}); 
//===================================================================================================
//  router.post("/", async (req, res) => {
//   const accessToken = await OAuth2_client.getAccessToken();

//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       type: "OAuth2",
//       user: config.user,
//       clientId: config.client_id,
//       clientSecret: config.client_secret,
//       refreshToken: config.refresh_token,
//       accessToken: accessToken,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const template_path = path.join(__dirname, "..", "views", "contact", "send.ejs");

//   // Pass the data as an object to the EJS template
//   const mail_options = {
//     from: `The G.O.A.T <${config.user}>`,
//     to: "ebitegift235@gmail.com",
//     subject: "A Message from The G.O.A.T",
//     html: await ejs.renderFile(template_path, { events: req.body }), // Using req.body to get the form data
//   };

//   transport.sendMail(mail_options, function (err, result) {
//     if (err) {
//       console.log(`Error: `, err);
//       res.status(500).json({ error: "An error occurred while sending the email" });
//     } else {
//       console.log(`Success: `, result);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//     transport.close();
//   });
// });

module.exports = router;