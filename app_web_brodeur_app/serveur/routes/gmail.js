import nodemailer from "nodemailer";
import { google } from "googleapis";
import { oauth2 } from "googleapis/build/src/apis/oauth2";
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function envoyerEmail() {
  try {
    const accesToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "arnaudkomodo@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        accesToken: accesToken,
      },
    });
    const mailOptions = {
      from: "Brodeurs App",
      to: "arnaudkomodo@gmail.com",
      subject: "code de verification",
      html: "<h1>test<h1>",
    };
    const resultat = await transport.sendMail(mailOptions);
  } catch (err) {}
}
