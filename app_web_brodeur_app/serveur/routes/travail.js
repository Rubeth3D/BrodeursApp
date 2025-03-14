import express from "express";
import cors from "cors";
import winston, { log } from "winston";
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

//Get tous les travaux
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM travail");
    res.status(200).json(resultat.rows);
    logger.info("Get tous les travaux effectuer avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des travaux : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des travaux!" });
  }
});

//Get un travail
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM travail WHERE id_travail = $1",
      id
    );

    if (resultat.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Aucun travail ne correspond au id : ${id}!` });
    }
    res.status(200).json(resultat.rows);
    logger.info("Get du travail effectuer avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch du travail : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch du travail!" });
  }
});

//Post un travail
router.post("/", async (req, res) => {
  try {
    const {code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail,classe_id_classe,etat_travail} = req.body;
    const resultat = await client.query(
      "INSERT INTO travail(code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail,classe_id_classe,etat_travail) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail,classe_id_classe,etat_travail]
    );
    logger.info("Insertion du travail effectuer avec succes");
    res.status(200).json(resultat.rows);
    } catch (err) {
    logger.error(`Erreur lors de l'insertion du travail : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion du travail!" });
  }
});

//Put un travail
router.put("/:id", async (req, res) => {
  try {
    const { code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail,classe_id_classe,etat_travail } = req.body;
    const id = req.params;
    const resultat = await client.query(
      "UPDATE travail SET code_travail = $1, nom_travail = $2, instrument_id_instrument = $3, date_cloture = $4, date_travail = $5,classe_id_classe = $6,etat_travail = $7 WHERE id_travail = $8 RETURNING *",
      [code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail,classe_id_classe,etat_travail, id]
    );
    logger.info("Update du travail effectuer avec succes");
    res.status(200).json(resultat.rows);
  } catch (err) {
    logger.error(`Erreur de la modification du travail : ${err}`);
    res.status(500).json({ message: "Erreur de la modification du travail"});
  }
});

//Delete un travail
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM travail WHERE id_travail = $1",
      id
    );
    logger.info("Supprimer le travail effectuer avec succes");
    res.status(200).json({ message: "Travail supprimé avec succès!" });
  } catch (err) {
    logger.error(`Erreur lors de la suppression du travail : ${err}`);
    res.status(500).json({ message: "Erreur lors de la suppression du travail!" });
  }
});
