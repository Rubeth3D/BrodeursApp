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
    const resultat = await client.query("SELECT * FROM travail");
    res.status(200).json(resultat.rows);
    logger.info("Get des travaux effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des travaux : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des travaux!" });
  }
});

//get pour une evaluation
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM travail WHERE id_travail = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucun travail n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucun travail n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get du travail effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get du travail : ${err}`);
    res.status(500).json({ message: "Erreur lors du get du travail" });
  }
});

//post pour une evaluation
router.post("/", async (req, res) => {
  try {
    const {
      code_travail,
      nom_travail,
      instrument_id_instrument,
      date_cloture,
      date_travail,
      classe_id_classe,
      etat_travail,
    } = req.body;
    const resultat = await client.query(
      "INSERT ON etudiant(code_travail,nom_travail,instrument_id_instrument,date_cloture,date_travail,classe_id_classe,etat_travail) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [
        (code_travail,
        nom_travail,
        instrument_id_instrument,
        date_cloture,
        date_travail,
        classe_id_classe,
        etat_travail),
      ]
    );
    res.status(200).json({ message: "Insert du travail fait avec succes" });
    logger.info("Insert du travail faite avec succes");
  } catch (err) {
    logger.error(`Erreur lors de l'insert du travail : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insert du travail" });
  }
});

//put pour une evaluation
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const {
      code_travail,
      nom_travail,
      instrument_id_instrument,
      date_cloture,
      date_travail,
      classe_id_classe,
      etat_travail,
    } = req.body;
    const resultat = await client.query(
      "UPDATE ON etudiant SET code_travail = $1, nom_travail = $2, instrument_id_instrument = $3, date_cloture = $4 , date_travail = $5, classe_id_classe = $6, etat_travail = $7 WHERE id_travail = $8 RETURNING *",
      [
        (code_travail,
        nom_travail,
        instrument_id_instrument,
        date_cloture,
        date_travail,
        classe_id_classe,
        etat_travail,
        id),
      ]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun travail ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun travail ne correspond a ce id" });
    }
    res.status(200).json({ message: "Update du travail fait avec succes!" });
    logger.info("Update du travail fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'update du travail" });
    logger.error(`Erreur lors de l'update du travail : ${err}`);
  }
});

//delete pour une evaluation

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM travail WHERE id_travail = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun travail ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun travail ne correspond a ce id" });
    }

    res.status(200).json({ message: "travail retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du travail" });
    logger.error(`Erreur lors du delete du travail : ${err}`);
  }
});

export default router;
