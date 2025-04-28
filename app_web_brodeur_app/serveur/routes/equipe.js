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

router.use(express.json());

// GET toutes les équipes
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM equipe");
    logger.info("Get des équipes effectué avec succès!");
    res.status(200).json(resultat.rows);
  } catch (err) {
    logger.error(`Erreur lors du fetch des équipes : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des équipes!" });
  }
});

// GET une seule équipe par id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultat = await client.query(
      "SELECT * FROM equipe WHERE id_equipe = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucune équipe n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucune équipe n'a le id : ${id}` });
    }

    res.status(200).json(resultat.rows[0]);
    logger.info("Get de l'équipe effectué avec succès!");
  } catch (err) {
    logger.error(`Erreur lors du get de l'équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors du get de l'équipe" });
  }
});

// POST créer une équipe
router.post("/", async (req, res) => {
  try {
    const { code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session } = req.body;
    await client.query(
      "INSERT INTO equipe (code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session) VALUES ($1, $2, $3, $4, $5, $6)",
      [code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session]
    );
    res.status(201).json({ message: "Équipe créée avec succès" });
    logger.info("Insert de l'équipe fait avec succès");
  } catch (err) {
    logger.error(`Erreur lors de l'insert de l'équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insert de l'équipe" });
  }
});

// PUT modifier une équipe
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session } = req.body;
    const resultat = await client.query(
      "UPDATE equipe SET code_equipe = $1, nom = $2, classe_id_classe = $3, etat_equipe = $4, id_cours = $5, id_session = $6 WHERE id_equipe = $7 RETURNING *",
      [code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session, id]
    );

    if (resultat.rowCount === 0) {
      logger.error("Aucune équipe ne correspond à cet id");
      return res
        .status(404)
        .json({ message: "Aucune équipe ne correspond à cet id" });
    }

    res.status(200).json({ message: "Équipe mise à jour avec succès!" });
    logger.info("Update de l'équipe fait avec succès!");
  } catch (err) {
    logger.error(`Erreur lors de l'update de l'équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'update de l'équipe" });
  }
});

// DELETE une équipe
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultat = await client.query(
      "DELETE FROM equipe WHERE id_equipe = $1 RETURNING *",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error("Aucune équipe ne correspond à cet id");
      return res
        .status(404)
        .json({ message: "Aucune équipe ne correspond à cet id" });
    }

    res.status(200).json({ message: "Équipe retirée avec succès" });
  } catch (err) {
    logger.error(`Erreur lors du delete de l'équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors du delete de l'équipe" });
  }
});

export default router;
