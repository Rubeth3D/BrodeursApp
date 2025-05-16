import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import { verifierSessionUtilisateur } from "../strategies/authentification.js";

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

//get pour les professeurs
router.get("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    const resultat = await client.query(
      "SELECT * FROM professeur WHERE etat_professeur = 'Actif' "
    );
    res.status(200).json(resultat.rows);
    logger.info("Get des professeurs effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des professeurs : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des professeurs!" });
  }
});

//get pour un professeur
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM professeurs WHERE id_professseur = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucun professeurs n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucun professeurs n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get des professeurs effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de l'etudiant : ${err}`);
    res.status(500).json({ message: "Erreur lors du get de l'etudiant" });
  }
});

//post pour un professeur
router.post("/", async (req, res) => {
  try {
    const { nomComplet, etat_professeur, utilisateur_id } = req.body;
    const resultat = await client.query(
      "INSERT ON etudiant(nom_complet,etat_professeur,utilisateur_id_user) VALUES($1,$2,$3)"[
        (nomComplet, etat_professeur, utilisateur_id)
      ]
    );
    res.status(200).json({ message: "Inscription fait avec succes" });
    logger.info("Insert du professeur fait avec succes");
  } catch (err) {
    logger.error(`Erreur lors du insert ${err}`);
    res.status(500).json({ message: "Erreur lors du insert" });
  }
});

//put pour un professeur
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const { id_professeur, nom_complet, etat_professeur, utilisateur_id_user } =
      req.body;
    const resultat = await client.query(
      "UPDATE ON professeur SET nom_complet = $1, etat_professeur = $2, utilisateur_id_user = $3 WHERE id_professeur = $4 RETURNING *"
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun professeur ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun professeur ne correspond a ce id" });
    }
    res.status(200).json({ message: "Update fait avec succes!" });
    logger.info("Update fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

//delete pour un etudiant

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM professeur WHERE id_professeur = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun professeur ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun professeur ne correspond a ce id" });
    }

    res.status(200).json({ message: "Cours retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du professeur" });
    logger.error(`Erreur lors du delete du professeur ${err}`);
  }
});

export default router;
