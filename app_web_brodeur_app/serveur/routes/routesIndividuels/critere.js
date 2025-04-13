import express, { json, query } from "express";
import cors from "cors";
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

//get pour les criteres
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM critere");
    res.status(200).json(resultat.rows);
    logger.info("Get des criteres effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des user : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des user!" });
  }
});

//get pour un critere
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM critere WHERE id_critere = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucun critere n'a le id : ${id}`);
      return res.status(404).json({ message: `Aucun user n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get du user effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get du user : ${err}`);
    res.status(500).json({ message: "Erreur lors du get du user" });
  }
});

//post pour un critere
router.post("/", async (req, res) => {
  try {
    const {
      instrumentIdInstrument,
      idCritere,
      codeCritere,
      description,
      valeur,
      etatCritere,
    } = req.body;
    const resultat = await client.query(
      "INSERT ON critere(instrument_id_instrument,id_critere,code_critere,description,valeur,etat_critere) VALUES($1,$2,$3,$4,$5,$6)"[
        (instrumentIdInstrument,
        idCritere,
        codeCritere,
        description,
        valeur,
        etatCritere)
      ]
    );
    res.status(200).json({ message: "Critere insere avec succes" });
    logger.info("Insert du critere fait avec succes");
  } catch (err) {
    logger.error(`Erreur lors du insert du critere : ${err}`);
    res.status(500).json({ message: "Erreur lors du insert du critere" });
  }
});

//put pour un critere
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const { codeCritere, description, valeur, etatCritere } = req.body;

    const resultat = await client.query(
      "UPDATE ON utilisateur SET  code_critere = $1,  description = $2 , valeur = $3 , etat_critere = $4 WHERE id_critere = $5 RETURNING *",
      [codeCritere, description, valeur, etatCritere, id]
    );

    if (resultat.rows.length === 0) {
      logger.error("Aucun critere ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun critere ne correspond a ce id" });
    }

    res.status(200).json({ message: "Update fait avec succes!" });
    logger.info("Update fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

//delete pour un critere

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM critere WHERE id_critere = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun critere ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun critere ne correspond a ce id" });
    }

    res.status(200).json({ message: "critere retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du critere" });
    logger.error(`Erreur lors du delete du critere : ${err}`);
  }
});

export default router;
