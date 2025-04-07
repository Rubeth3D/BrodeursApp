import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";
import passport from "passport";
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
const creationUtilisateur = async (req, res, next) => {
  try {
    const {
      nom,
      prenom,
      nom_utilisateur,
      courriel,
      mot_passe,
      numero_da,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
      etat_utilisateur,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const mot_passe_hash = await bcrypt.hash(mot_passe, salt);
    // Correction de la syntaxe de la requête SQL
    const resultat_utilisateur = await client.query(
      "INSERT INTO utilisateur(nom,prenom,nom_utilisateur, courriel, mot_passe,numero_da, type_utilisateur, professeur_id_professeur, etudiant_id_etudiant, etat_utilisateur) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10) RETURNING *; ",
      [
        nom,
        prenom,
        nom_utilisateur,
        courriel,
        mot_passe_hash,
        numero_da,
        type_utilisateur,
        professeur_id_professeur,
        etudiant_id_etudiant,
        etat_utilisateur,
      ]
    );
    logger.info("Insertion de l'utilisateur effectuée avec succès");
    const utilisateur = resultat_utilisateur.rows[0];
    logger.info(`Id utilisateur cree : ${utilisateur.id_utilisateur}`);
    req.login(utilisateur, (err) => {
      if (err) {
        logger.error(`Erreur lors du login de l'utilisateur : ${err}`);
        return next(err);
      }
      req.body = {};
      req.body.type_utilisateur = type_utilisateur;
      req.body.id_utilisateur = utilisateur.id_utilisateur;
      req.body.type_utilisateur = utilisateur.type_utilisateur;
      next();
    });
  } catch (err) {
    logger.error(`Erreur lors de l'insertion : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
};
const creationSession = async (req, res) => {
  try {
    logger.info(`Utilisateur actif : ${req.user.nom_utilisateur}`);
    if (!req.session.cookie) {
      return res.status(401).json({ message: "cookie inexistant!" });
    }
    const date_connexion = new Date();
    const date_jeton_expiration = req.session.cookie.expires;
    const tentatives_echoues = 0;
    const date_derniere_tentative = new Date();
    const ip_derniere_connexion = req.ip;
    const type_utilisateur = req.body.type_utilisateur;
    const utilisateur_id_utilisateur = req.body.id_utilisateur;
    const etat_session_utilisateur = req.body.type_utilisateur;

    const resultat = await client.query(
      "INSERT INTO session_utilisateur(date_connexion,date_jeton_expiration,tentatives_echoues, date_derniere_tentative, ip_derniere_connexion,type_utilisateur,utilisateur_id_utilisateur, etat_session_utilisateur) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *; ",
      [
        date_connexion,
        date_jeton_expiration,
        tentatives_echoues,
        date_derniere_tentative,
        ip_derniere_connexion,
        type_utilisateur,
        utilisateur_id_utilisateur,
        etat_session_utilisateur,
      ]
    );
    logger.info(
      `Creation de la session_utilisateur : ${resultat.rows[0].id_session_utilisateur} fait avec succes`
    );
    return res.status(200);
  } catch (err) {
    logger.info(`Erreur lors de la creation de la session utilisateur ${err}`);
    return res
      .status(500)
      .json({ message: "erreur lors de la creation de la session" });
  }
};
const fetchDataUtilisateur = async (req, res) => {};
router.get("/connexionEchoue", async (req, res) => {
  res.status(201).json({ estConnecte: false });
});

router.post("/creationCompte", [creationUtilisateur, creationSession]);
router.post(
  "/connexionManuelle",
  passport.authenticate("local", {
    failureRedirect: "/authentification/connexionEchoue",
  }),
  (req, res) => {
    logger.info(req.user);
    res.status(200).json({ message: "Connexion reussi!" });
  }
);

export default router;
