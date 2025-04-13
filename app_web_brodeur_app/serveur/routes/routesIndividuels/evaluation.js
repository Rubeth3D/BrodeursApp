import express, { json, query } from "express";
import winston from "winston";
import client from "../../bd/postgresBD/Connexion.js";

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
    const resultat = await client.query("SELECT * FROM evaluation");
    res.status(200).json(resultat.rows);
    logger.info("Get des evaluations effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des evaluations : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des evaluations!" });
  }
});

//get pour une evaluation
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM evaluation WHERE id_evaluation = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucune evaluation n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucune evaluation n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get de l'evaluation effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de l'evaluation : ${err}`);
    res.status(500).json({ message: "Erreur lors du get de l'evaluation" });
  }
});

//post pour une evaluation
router.post("/", async (req, res) => {
  try {
    const {
      travail_id_travail,
      etudiant_id_etudiant,
      date_evaluation,
      instrument_id_instrument,
      equipe_id_equipe,
      code_evaluation,
      description,
      classe_id_classe,
      evaluation_terminee,
      etat_evaluation,
    } = req.body;
    const resultat = await client.query(
      "INSERT ON etudiant(travail_id_travail, etudiant_id_etudiant, date_evaluation,instrument_id_instrument,equipe_id_equipe,code_evaluation,description,classe_id_classe,evaluation_terminee,etat_evaluation) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [
        (travail_id_travail,
        etudiant_id_etudiant,
        date_evaluation,
        instrument_id_instrument,
        equipe_id_equipe,
        code_evaluation,
        description,
        classe_id_classe,
        evaluation_terminee,
        etat_evaluation),
      ]
    );
    res.status(200).json({ message: "Inscription fait avec succes" });
    logger.info("Insert de l'evaluation faite avec succes");
  } catch (err) {
    logger.error(`Erreur lors de l'insert de l'evaluation ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors de l'insert de l'evaluation" });
  }
});

//put pour une evaluation
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const {
      travail_id_travail,
      etudiant_id_etudiant,
      date_evaluation,
      instrument_id_instrument,
      equipe_id_equipe,
      code_evaluation,
      description,
      classe_id_classe,
      evaluation_terminee,
      etat_evaluation,
    } = req.body;
    const resultat = await client.query(
      "UPDATE ON etudiant SET travail_id_travail = $1, etudiant_id_etudiant = $2, date_evaluation = $3, instrument_id_instrument = $4 , equipe_id_equipe = $5, code_evaluation = $6, description = $7, classe_id_classe = $8,evaluation_terminee = $9, etat_evaluation = $10 WHERE id_evaluation = $11 RETURNING *",
      [
        (travail_id_travail,
        etudiant_id_etudiant,
        date_evaluation,
        instrument_id_instrument,
        equipe_id_equipe,
        code_evaluation,
        description,
        classe_id_classe,
        evaluation_terminee,
        etat_evaluation,
        id),
      ]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucune evaluation ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucune evaluation ne correspond a ce id" });
    }
    res
      .status(200)
      .json({ message: "Update de l'evaluation fait avec succes!" });
    logger.info("Update de l'evaluation fait avec succes!");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'update de l'evaluation" });
    logger.error(`Erreur lors de l'update de l'evaluation : ${err}`);
  }
});

//delete pour une evaluation

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM evaluation WHERE id = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucune evaluation ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucune evaluation ne correspond a ce id" });
    }

    res.status(200).json({ message: "evaluation retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete de l'evaluation" });
    logger.error(`Erreur lors du delete de l'equipe : ${err}`);
  }
});

export default router;
