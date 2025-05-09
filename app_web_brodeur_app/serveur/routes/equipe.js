import express, { json, query } from "express";
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

//get pour les equipes
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM equipe");
    res.status(200).json(resultat.rows);
    logger.info("Get des equipes effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des equipes : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des equipes!" });
  }
});

//get pour un etudiant
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resultat = await client.query(
      "SELECT * FROM equipe WHERE id_equipe = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucune equipe n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucune equipe n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get de l'equipe effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de l'equipe : ${err}`);
    res.status(500).json({ message: "Erreur lors du get de l'equipe" });
  }
});

//post pour un etudiant
router.post("/", async (req, res) => {
  try {
    const {nom, classe_id_classe, etat_equipe } = req.body;

    const resultat = await client.query(
      "INSERT INTO equipe(nom, classe_id_classe, etat_equipe) VALUES($1, $2, $3)",
      [nom, classe_id_classe, etat_equipe]
    );

    res.status(200).json({ message: "Inscription effectuée avec succès" });
    logger.info("Insertion de l'équipe réussie");
  } catch (err) {
    logger.error(`Erreur lors de l'insertion de l'équipe : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion de l'équipe" });
  }
});

//put pour un etudiant
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { code_equipe, nom, classe_id_classe, etat_equipe } = req.body;
    const resultat = await client.query(
      "UPDATE equipe SET code_equipe = $1, nom = $2, classe_id_classe = $3, etat_equipe = $4 WHERE id_equipe = $5 RETURNING *",
      [code_equipe, nom, classe_id_classe, etat_equipe, id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucune equipe ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucune equipe ne correspond a ce id" });
    }
    res.status(200).json({ message: "Update de l'equipe fait avec succes!" });
    logger.info("Update de l'equipe fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'update de l'equipe" });
    logger.error(`Erreur lors de l'update de l'equipe : ${err}`);
  }
});

//delete pour une equipe

router.delete("/:id", async (req, res) => {
  try {
   const id = req.params.id;
    const resultat = await client.query(
      "DELETE FROM equipe WHERE id_equipe = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucune equipe ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucune equipe ne correspond a ce id" });
    }

    res.status(200).json({ message: "Equipe retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete de l'equipe" });
    logger.error(`Erreur lors du delete de l'equipe : ${err}`);
  }
});

export default router;
