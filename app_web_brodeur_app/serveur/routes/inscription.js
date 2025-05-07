import express, { json, query } from "express";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import oAuth2Client from "../api/oAuth2Client.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import creerId from "../strategies/creerId.js";
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
router.post(
  "/VerifierUtilisateur/:courriel",
  async (req, res, next) => {
    try {
      console.log(`abeille`);
      const { courriel } = req.params;
      const { type_utilisateur } = req.body;
      const reponse = await client.query(
        "SELECT type_utilisateur FROM utilisateur WHERE courriel = $1",
        [courriel]
      );
      if (reponse.rowCount === 0) {
        return res.status(404).json({
          message:
            "Votre courriel n'existe pas! Veuillez contacter votre administrateur ou enseignant pour vous inscrire.",
        });
      }
      const jsonReponse = reponse.rows[0];
      if (type_utilisateur != jsonReponse.type_utilisateur) {
        logger.error(
          `Mauvais role : ${type_utilisateur} != ${affichage_type_utilisateur_bd}`
        );
        return res.status(422).json({
          message: "Veuillez vous inscrire au bon role!",
        });
      }
      req.courriel = courriel;
      next();
    } catch (err) {
      logger.error("Erreur lors de la verification des utilisateurs :", err);
      return res.status(500);
    }
  },
  async (req, res) => {
    try {
      const courriel = req.courriel;
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

      return res
        .status(200)
        .json({ message: "Votre code de verification vous a été envoyé!" });
    } catch (err) {
      logger.error("Erreur lors de l'envoi du courriel : ", err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.post("/VerifierCode/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    const { code } = req.body;
    const reponse = await client.query(
      "SELECT code FROM code_verification WHERE courriel = $1 AND code = $2",
      [courriel, code]
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
    const { courriel } = req.params;
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
    const resultat = await client.query(
      "UPDATE utilisateur SET nom = $1, prenom = $2, nom_utilisateur = $3 ,mot_de_passe = $4, etat_utilisateur = $5, type_utilisateur = $6, professeur_id_professeur = $7, etudiant_id_etudiant = $8 WHERE courriel = $9 RETURNING *",
      [
        nom,
        prenom,
        nom_utilisateur,
        mot_de_passe_hash,
        etat_utilisateur,
        type_utilisateur,
        professeur_id_professeur,
        etudiant_id_etudiant,
        courriel,
      ]
    );
    const utilisateur = resultat.rows[0];
    const idSession = await creerId(client);
    utilisateur.session_id = idSession;

    console.log("Utilisateur a etre loged : ", utilisateur);

    logger.info("Update fait avec succes!");
    res.status(200).json({ message: "Code validé avec succès!" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

export default router;
