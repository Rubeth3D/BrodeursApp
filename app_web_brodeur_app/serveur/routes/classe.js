import express from "express";
import cors from "cors";
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

//get de toutes les classes
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("GET * FROM classe");
    res.json(resultat.rows);
    logger.info("Get des classes effectue avec succes!");
    res.status(200);
  } catch (err) {
    logger.error(`Erreur lors du get des classes ${err}`);
    res.status(500);
    res.json({
      message: "Erreur lors du fetch des classes",
    });
  }
});

//get d'une classe
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "GET * FROM classe WHERE id_classe = $1",
      id
    );

    if (resultat.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Aucune classe ne correspond au id : ${id}!` });
    }
    res.status(200).json(resultat.rows);
    logger.info("Get de la classe effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de une classe `);
    res.status(500);
    res.json({
      message: "Erreur lors du fetch de votre classe",
    });
  }
});

//Insert d'une classe
router.post("/", async (req, res) => {
  try {
    const { codeCours, description, session, groupe, etat_classe} = req.params;
    const resultat = await client.query("INSERT");
  } catch (err) {}
});
