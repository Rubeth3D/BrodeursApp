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
      mot_de_passe,
      courriel,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
      etat_utilisateur,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, salt);
    // Correction de la syntaxe de la requête SQL
    const resultat_utilisateur = await client.query(
      "INSERT INTO utilisateur(nom,prenom,nom_utilisateur, mot_passe, courriel, type_utilisateur, professeur_id_professeur, etudiant_id_etudiant, etat_utilisateur) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9);",
      [
        nom,
        prenom,
        nom_utilisateur,
        mot_de_passe_hash,
        courriel,
        type_utilisateur,
        professeur_id_professeur,
        etudiant_id_etudiant,
        etat_utilisateur,
      ]
    );
    logger.info("Insertion de l'utilisateur effectuée avec succès");
    next();
  } catch (err) {
    logger.error(`Erreur lors de l'insertion : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
};
const creationSession = async (req, res) => {
  res.status(201).json({ message: "test" });
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
  })
);

export default router;
