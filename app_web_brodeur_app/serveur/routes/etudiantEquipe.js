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
    const resultat = await client.query("SELECT * FROM etudiantEquipe");
    res.status(200).json(resultat.rows);
    logger.info("Get des associations étudiant-équipe effectué avec succès!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des associations : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des associations!" });
  }
});

router.get("/etudiant/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resultat = await client.query(
      "SELECT * FROM etudiantEquipe WHERE etudiant_id_etudiant = $1",
      [id]
    );
    if (resultat.rowCount === 0) {
      logger.warn(`Aucune équipe trouvée pour l'étudiant ${id}`);
      return res.status(404).json({ message: `Aucune équipe trouvée pour l'étudiant ${id}` });
    }
    res.status(200).json(resultat.rows);
    logger.info(`Get des équipes de l'étudiant ${id} effectué avec succès!`);
  } catch (err) {
    logger.error(`Erreur lors du get des équipes de l'étudiant ${id} : ${err}`);
    res.status(500).json({ message: "Erreur lors de la récupération des données." });
  }
});

router.post("/", async (req, res) => {
  const { equipe_id_equipe, etudiant_id_etudiant } = req.body;
  try {
    const resultat = await client.query(
      "INSERT INTO etudiantEquipe (equipe_id_equipe, etudiant_id_etudiant) VALUES ($1, $2) RETURNING *",
      [equipe_id_equipe, etudiant_id_etudiant]
    );
    res.status(201).json({ message: "Association créée avec succès", data: resultat.rows[0] });
    logger.info(`Association ajoutée : étudiant ${etudiant_id_etudiant} à équipe ${equipe_id_equipe}`);
  } catch (err) {
    logger.error(`Erreur lors de l'insertion de l'association : ${err}`);
    res.status(500).json({ message: "Erreur lors de la création de l'association" });
  }
});

router.put("/", async (req, res) => {
  const { equipe_id_equipe, etudiant_id_etudiant } = req.body;
  try {
    const resultat = await client.query(
      "UPDATE etudiantEquipe SET equipe_id_equipe = $1 WHERE etudiant_id_etudiant = $2 RETURNING *",
      [equipe_id_equipe, etudiant_id_etudiant]
    );
    if (resultat.rowCount === 0) {
      logger.warn(`Aucune association trouvée pour l'étudiant ${etudiant_id_etudiant}`);
      return res.status(404).json({ message: "Association non trouvée" });
    }
    res.status(200).json({ message: "Association mise à jour avec succès", data: resultat.rows[0] });
    logger.info(`Association mise à jour : étudiant ${etudiant_id_etudiant} à équipe ${equipe_id_equipe}`);
  } catch (err) {
    logger.error(`Erreur lors de la mise à jour de l'association : ${err}`);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'association" });
  }
}
);  

router.delete("/", async (req, res) => {
  const { equipe_id_equipe, etudiant_id_etudiant } = req.body;
  try {
    const resultat = await client.query(
      "DELETE FROM etudiantEquipe WHERE equipe_id_equipe = $1 AND etudiant_id_etudiant = $2 RETURNING *",
      [equipe_id_equipe, etudiant_id_etudiant]
    );
    if (resultat.rows.length === 0) {
      logger.warn(`Aucune association trouvée entre étudiant ${etudiant_id_etudiant} et équipe ${equipe_id_equipe}`);
      return res.status(404).json({ message: "Association non trouvée" });
    }
    res.status(200).json({ message: "Association supprimée avec succès" });
    logger.info(`Association supprimée : étudiant ${etudiant_id_etudiant} de l'équipe ${equipe_id_equipe}`);
  } catch (err) {
    logger.error(`Erreur lors de la suppression de l'association : ${err}`);
    res.status(500).json({ message: "Erreur lors de la suppression de l'association" });
  }
});

export default router;
