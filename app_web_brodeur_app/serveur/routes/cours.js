import express, { json } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/connexion.js";

//logger winston setup
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

const Router = express.Router();

Router.use(cors());
Router.use(express());


//get avec le id
Router.get("/:idCours", async (req, res) => {
  try {
    const { idCours } = req.params;
    const cours = await client.query(
      "SELECT * FROM cours WHERE id_cours = $1",
      [idCours]
    );
    logger.info("Get du cours effectue avec succes");
    res.json(cours.rows);
    res.status(cours.StatusCode);
  } catch (err) {
    logger.error(`ERROR GET COURS : ${err}`);
    res.status(res.StatusCode);
  }
});
//post un cours
Router.post("/", async (req, res) => {
  try {
    const {
      id_cours,
      code_cours,
      description_cours,
      etat_cours,
      session_id_session,
    } = req.body;
    logger.info(req.body.rows);
    const nouveauCours = await client.query(
      "INSERT INTO cours (id_cours, code_cours, description_cours, etat_cours, session_id_session) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id_cours, code_cours, description_cours, etat_cours, session_id_session]
    );

    logger.info("Insert effectue avec succes");
    logger.info(`Nouveau Cours : ${requete.rows}`);
    res.status(res.StatusCode).json({ message: "Cours insere avec succes!" });
  } catch (err) {
    logger.error(`ERROR POST COURS : ${err}`);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

//update un cours
Router.put("/:idCours", async (req, res) => {
  try {
    const { idCours } = req.params.id;
    const { code_cours, description_cours, etat_cours, session_id_session } =
      req.body;
    const coursUpdate = client.query(
      "UPDATE cours SET code_cours = $1, description_cours = $2, etat_cours = $3, session_id_session = $4 WHERE id_cours = $5",
      [code_cours, description_cours, etat_cours, session_id_session, idCours]
    );
    res
      .status(res.StatusCode)
      .json({ message: "Cours mis a jour avec succes !" });
  } catch (err) {
    logger.error(`ERREUR PUT COURS : ${err}`);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

//delete un cours
Router.delete("/:idCours", async (req, res) => {
  try {
    const idCours = req.params.id;
    const coursDelete = client.query("DELETE cours WHERE id = $1", [idCours]);
    res.status().json({ message: "Cours mis a jour avec succes !" });
  } catch (err) {
    logger.error(` ERREUR DELETE COURS  : ${err}`);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

export default Router;
