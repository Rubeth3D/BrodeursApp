import express, { json, query } from "express";
import winston from "winston";
import client from "../bd/connexion.js";

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

//get pour les equipes
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM reponse");
    res.status(200).json(resultat.rows);
    logger.info("Get des reponses effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des reponses : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des reponses!" });
  }
});

//get pour une evaluation
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM reponse WHERE id_reponse = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucune reponse n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucune reponse n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get de la reponse effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de la reponse : ${err}`);
    res.status(500).json({ message: "Erreur lors du get de la reponse" });
  }
});

//post pour une evaluation
router.post("/", async (req, res) => {
  try {
    const {
      evaluation_id_evaluation,
      note,
      commentaire,
      niveau_performance_id_niveau,
      etat_reponse,
    } = req.body;
    const resultat = await client.query(
      "INSERT ON etudiant(evaluation_id_evaluation,note,commentaire,niveau_performance_id_niveau,etat_reponse) VALUES($1,$2,$3,$4,$5)",
      [
        (evaluation_id_evaluation,
        note,
        commentaire,
        niveau_performance_id_niveau,
        etat_reponse),
      ]
    );
    res.status(200).json({ message: "Insert de la reponse fait avec succes" });
    logger.info("Insert de la reponse faite avec succes");
  } catch (err) {
    logger.error(`Erreur lors de l'insert de la reponse : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insert de la reponse" });
  }
});

//put pour une evaluation
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const {
      evaluation_id_evaluation,
      note,
      commentaire,
      niveau_performance_id_niveau,
      etat_reponse,
    } = req.body;
    const resultat = await client.query(
      "UPDATE ON etudiant SET evaluation_id_evaluation = $1, note = $2, commentaire = $3, niveau_performance_id_niveau = $4 , etat_reponse = $5 WHERE id_travail = $6 RETURNING *",
      [
        (evaluation_id_evaluation,
        note,
        commentaire,
        niveau_performance_id_niveau,
        etat_reponse,
        id),
      ]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucune reponse ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucune reponse ne correspond a ce id" });
    }
    res
      .status(200)
      .json({ message: "Update de la reponse faite avec succes!" });
    logger.info("Update de la reponse faite avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'update de la reponse" });
    logger.error(`Erreur lors de l'update de la reponse : ${err}`);
  }
});

//delete pour une evaluation

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM reponse WHERE id_reponse = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun reponse ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun reponse ne correspond a ce id" });
    }

    res.status(200).json({ message: "reponse retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du reponse" });
    logger.error(`Erreur lors du delete du reponse : ${err}`);
  }
});

export default router;
