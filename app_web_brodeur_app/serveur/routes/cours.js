import express from "express";
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

const { Routeur } = express();

Routeur.use(cors());
Routeur.use(express());

//get en tableau
Routeur.get("/", async (req, res) => {
  try {
    const cours = await client.query("SELECT * FROM cours");
    logger.info("Get des cours effectue avec succes");
    res.json(descriptionTables.rows);
    res.status(res.StatusCode);
  } catch (error) {
    logger.error(error.message);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});
//get avec le id
Routeur.get("/:idCours", async (req, res) => {
  try {
    const { idCours } = req.params.id;
    const cours = await client.query(
      "SELECT * FROM cours WHERE id_cours = $1",
      [id_cours]
    );
    logger.info("Get du cours effectue avec succes");
    res.json(cours.rows);
    res.status(res.StatusCode);
  } catch (error) {
    logger.error(error);
    res.status(res.StatusCode);
  }
});
//post un cours
Routeur.post("/", async (req, res) => {
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
    res.status(res.StatusCode).json({ message: "Cours inserre avec succes!" });
  } catch (error) {
    logger.error(error);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

//update un cours
Routeur.put("/:idCours", async (req, res) => {
  try {
    const { idCours } = req.params.id;
    const { code_cours, description_cours, etat_cours, session_id_session } =
      req.body;
    const coursUpdate = client.query(
      "UPDATE cours SET code_cours = 1$, description_cours = 2$, etat_cours = 3$, session_id_session = 4$ WHERE id_cours = $5",
      [code_cours, description_cours, etat_cours, session_id_session, idCours]
    );
    res
      .status(res.StatusCode)
      .json({ message: "Cours mis a jour avec succes !" });
  } catch (err) {
    logger.error(err);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

//delete un cours
Routeur.delete("/:idCours", async (req, res) => {
  try {
    const idCours = req.params.id;
    const coursDelete = client.query("DELETE cours WHERE id = $1", [idCours]);
    res.status().json({ message: "Cours mis a jour avec succes !" });
  } catch (err) {
    logger.info(err);
    res
      .status(res.StatusCode)
      .json({ message: `Il y a eu une erreur de type ${res.StatusCode}` });
  }
});

Routeur.listen(3000, () => {
  logger.info("Le serveur roule sur le port 3000");
});

export default Routeur;
