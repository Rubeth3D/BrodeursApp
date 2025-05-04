import express from "express";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";

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

router.get("/", async (req, res) => {
    try {
        const result = await client.query("SELECT * FROM etudiant_equipe");
        logger.info("Récupération de toutes les associations étudiant-équipe réussie");
        res.status(200).json(result.rows);
    } catch (err) {
        logger.error(`Erreur lors de la récupération des associations étudiant-équipe : ${err}`);
        res.status(500).json({ message: "Erreur lors de la récupération des associations étudiant-équipe" });
    }
    }
);


router.post("/", async (req, res) => {
  try {
    const { equipe_id_equipe, etudiant_id_etudiant } = req.body;

    await client.query(
      "INSERT INTO etudiant_equipe (equipe_id_equipe, etudiant_id_etudiant) VALUES ($1, $2)",
      [equipe_id_equipe, etudiant_id_etudiant]
    );

    logger.info(`Étudiant ${etudiant_id_etudiant} associé à l'équipe ${equipe_id_equipe}`);
    res.status(201).json({ message: "Association créée avec succès" });
  } catch (err) {
    logger.error(`Erreur lors de l'association étudiant-équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'association étudiant-équipe" });
  }
});


router.delete("/", async (req, res) => {
  try {
    const { equipe_id_equipe, etudiant_id_etudiant } = req.body;

    const result = await client.query(
      "DELETE FROM etudiant_equipe WHERE equipe_id_equipe = $1 AND etudiant_id_etudiant = $2 RETURNING *",
      [equipe_id_equipe, etudiant_id_etudiant]
    );

    if (result.rowCount === 0) {
      logger.warn(`Aucune association trouvée entre étudiant ${etudiant_id_etudiant} et équipe ${equipe_id_equipe}`);
      return res.status(404).json({ message: "Association non trouvée" });
    }

    logger.info(`Association supprimée entre étudiant ${etudiant_id_etudiant} et équipe ${equipe_id_equipe}`);
    res.status(200).json({ message: "Association supprimée avec succès" });
  } catch (err) {
    logger.error(`Erreur lors de la suppression de l'association : ${err}`);
    res.status(500).json({ message: "Erreur lors de la suppression de l'association" });
  }
});


router.get("/equipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await client.query(
      `SELECT e.* FROM etudiant e
       JOIN etudiant_equipe ee ON e.id_etudiant = ee.etudiant_id_etudiant
       WHERE ee.equipe_id_equipe = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    logger.error(`Erreur lors de la récupération des étudiants de l'équipe ${req.params.id} : ${err}`);
    res.status(500).json({ message: "Erreur lors de la récupération des étudiants de l'équipe" });
  }
});

export default router;
