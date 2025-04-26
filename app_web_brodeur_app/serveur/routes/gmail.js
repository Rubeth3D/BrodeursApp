import jwtClient from "../api/oAuth2Client.js";
import winston from "winston";
import express from "express";
import nodemailer from "nodemailer";
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "server.log" }),
  ],
});

const router = express.Router();
router.put("/envoyerCode", async (req, res) => {
  try {
    const { courriel } = req.body;
    const jetonAcces = await jwtClient.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "arnaudkomodo@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
    logger.info("Transport créé : ", transport);
    const codeVerification = Math.floor(1000 + Math.random() * 9000);

    const mailOptions = {
      from: "Brodeurs App",
      to: courriel,
      subject: "code de verification",
      html: `Voici votre code de verification : ${codeVerification} </h1>`,
    };
    await transport.sendMail(mailOptions);
    res.status(200).json({ message: "Courriel envoye avec succes" });
  } catch (err) {
    logger.error("Erreur lors de l'envoi du courriel : ", err);
    res.status(500).json({ message: "Erreur lors de l'envoie du courriel" });
  }
});
export default router;
