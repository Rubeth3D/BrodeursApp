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
        console.log(utilisateur.id_utilisateur);
        logger.info("Get de l'utilisateur effectué avec succès");
        const requetPost = `UPDATE utilisateur
        SET etat_utilisateur = $1
        WHERE id_utilisateur = $2`;
        const resulatPost = await client.query(requetPost, [
          "Actif",
          utilisateur.id_utilisateur,
        ]);
        if (resulatPost.rows.length > 0) {
          logger.info("Le compte est maintenant actif");
          return res.status(200);
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

//connexion
router.post("/login", async (req, res) => {
  try {
    logger.info("Activation de l'utilisateur");

    const courriel = req.body.courriel;
    const type_utilisateur = req.body.type_utilisateur;
    console.log(req.body);
    const requete = `SELECT * from utilisateur WHERE courriel = $1 
      AND type_utilisateur = $2`;
    const resultat = await client.query(requete, [courriel, type_utilisateur]);

    // Vérifie ici si tu récupères bien un utilisateur
    if (resultat.rows.length > 0) {
      if (resultat.etat_utilisateur == "Actif") {
        logger.info("Le compte est deja activé");
        return res.status(401).json({ message: "Le compte est deja activé" });
      } else {
        logger.info("Get de l'utilisateur effectué avec succès");
        return res.status(200).json(resultat.rows);
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
