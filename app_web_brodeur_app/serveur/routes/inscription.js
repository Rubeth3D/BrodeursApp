import express, { json, query } from "express";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import oAuth2Client from "../api/oAuth2Client.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
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
router.post("/envoyerCode/:courriel", async (req, res) => {
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
    await client.query(
      "INSERT INTO code_verification(code,courriel) VALUES ($1,$2)",
      [codeVerification, courriel]
    );

    res.status(200).json({ message: "Courriel envoye avec succes" });
  } catch (err) {
    logger.error("Erreur lors de l'envoi du courriel : ", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/VerifierCode/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    const { code } = req.body;
    const reponse = await client.query(
      "SELECT code FROM code_verification WHERE courriel = $1 AND code = $2",
      [courriel],
      [code]
    );
    if (reponse.rowCount === 0) {
      return res.status(404).json({ message: "Votre code a expiré!" });
    }
    return res.status(200).json({ message: "Code correspondant!" });
  } catch (err) {
    logger.error("Erreur lors de la verification du code : ", err);
    return res.status(500).json({ message: err.message });
  }
});
router.put("/CreationCompte/:courriel", async (req, res) => {
  try {
    const courriel = req.params;
    const {
      nom,
      prenom,
      nom_utilisateur,
      mot_de_passe,
      etat_utilisateur,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, salt);
    await client.query(
      "UPDATE ON utilisateur SET nom = $1, prenom = $2, nom_utilisateur = $3 ,mot_de_passe = $4, etat_utilisateur = $5, type_utilisateur = $6, professeur_id_professeur = $7, etudiant_id_etudiant = $8 WHERE courriel = $9 RETURNING etat_utilisateur"[
        (nom,
        prenom,
        nom_utilisateur,
        mot_de_passe_hash,
        etat_utilisateur,
        type_utilisateur,
        professeur_id_professeur,
        etudiant_id_etudiant,
        courriel)
      ]
    );

    res.status(200).json({ message: "Inscription faite avec succès!" });
    logger.info("Update fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

export default router;
