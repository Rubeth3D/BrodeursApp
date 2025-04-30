import express, { json, query } from "express";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import oAuth2Client from "../api/oAuth2Client.js";
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

router.use(express.json());
router.get("/etudiantExiste/:nom_complet", async (req, res) => {
  try {
    const { nom_complet } = req.params;
    console.log("Nom complet : ", nom_complet);
    const resultat = await client.query(
      "SELECT FROM etudiant WHERE nom_complet = $1 AND etat_etudiant = 'Inactif'",
      [nom_complet]
    );

    if (resultat.rowCount === 0) {
      logger.info("L'etudiant n'existe pas!");
      return res
        .status(404)
        .json({ message: "Vous n'existez pas en tant qu'étudiant" });
    }
    return res.status(200).json({ message: "Code de verification envoye!" });
  } catch (err) {
    logger.error(
      "Erreur lors de la verification de l'existance de l'etudiant : ",
      err
    );
    return res.status(500).json({
      message:
        " Erreur serveur, veuillez contactez l'equipe de developpement a l'adresse : arnaudkomodo@gmail.com",
    });
  }
});
//verifier si professeur existe
router.get("/professeurExiste/:nom_complet", async (req, res) => {
  try {
    const { nom_complet } = req.params;
    const resultat = await client.query(
      "SELECT FROM professeur WHERE nom_complet = $1 AND etat_professeur = 'Inactif'",
      [nom_complet]
    );

    if (resultat.rowCount === 0) {
      logger.info("Le professeur n'existe pas!");
      return res
        .status(404)
        .json({ message: "Vous n'existez pas en tant que professeur" });
    }
    return res.status(200).json({ message: "Code de verification envoye!" });
  } catch (err) {
    logger.error(
      "Erreur lors de la verification de l'existance du professeur : ",
      err
    );
    return res.status(500).json({
      message:
        " Erreur serveur, veuillez contactez l'equipe de developpement a l'adresse : arnaudkomodo@gmail.com",
    });
  }
});
router.put("/envoyerCode/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    const jetonAcces = await oAuth2Client.getAccessToken();
    console.log("Jeton d'acces : ", jetonAcces);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "evaluationparlespairs@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        accessToken: jetonAcces.token,
      },
    });
    logger.info("Transport créé");
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
    res.status(500).json({ message: err.message });
  }
});
export default router;
