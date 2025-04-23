import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import connexionPostgres from "../bd/postgresBD/Connexion.js";

//route de cedryk lelightskin
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

//get pour les sessions
router.get("/", async (req, res) => {
  try {
    const resultat = await connexionPostgres.query("SELECT * FROM session");
    res.status(200).json(resultat.rows);
    logger.info("Get des sessions effectuer avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des sessions : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des sessions!" });
  }
});
export default router;
