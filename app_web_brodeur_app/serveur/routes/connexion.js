import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";
import { verifierSessionUtilisateur } from "../strategies/authentification.js";
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

//Inscription
router.post("/activerUtilisateur", async (req, res) => {
  try {
    logger.info("Recherche de l'utilisateur");

    const courriel = req.body.courriel;
    const type_utilisateur = req.body.type_utilisateur;
    console.log(req.body);
    const requeteGet = `SELECT * from utilisateur WHERE courriel = $1 
      AND type_utilisateur = $2`;
    const resultatGet = await client.query(requeteGet, [
      courriel,
      type_utilisateur,
    ]);

    // Vérifie ici si tu récupères bien un utilisateur
    if (resultatGet.rows.length > 0) {
      const utilisateur = resultatGet.rows[0];
      if (utilisateur.etat_utilisateur == "Actif") {
        logger.info("Le compte est deja activé");
        return res.status(401).json({ message: "Le compte est deja activé" });
      } else {
        logger.info("Activation de l'utilisateur");
        const date = new Date();
        const saltRounds = 10;
        const motDePasseCrypter = await bcrypt.hash(
          req.body.mot_de_passe,
          saltRounds
        );
        const requetPost = `UPDATE utilisateur
        SET etat_utilisateur = $1,
        nom = $2,
        prenom = $3,
        nom_utilisateur = $4,
        mot_de_passe = $5,
        date_creation = $6
        WHERE id_utilisateur = $7`;
        const resulatPost = await client.query(requetPost, [
          "Actif",
          req.body.nom,
          req.body.prenom,
          req.body.nom_utilisateur,
          motDePasseCrypter,
          date,
          utilisateur.id_utilisateur,
        ]);
        console.log(resulatPost);
        if (resulatPost.rowCount > 0) {
          logger.info("Le compte est maintenant actif");
          return res.status(200).json({ message: "Activation réussis" });
        } else {
          return res.status(406).json({ message: "Activation rater" });
        }
      }
    } else {
      logger.info("Aucun utilisateur  trouvé dans la base de données");
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    logger.error(
      "Erreur lors de la récupération des utilisateur  : " + error.message
    );
    return res
      .status(500)
      .json({ message: "Il y a eu une erreur de type 500" });
  }
});

//déconnexion

export default router;
