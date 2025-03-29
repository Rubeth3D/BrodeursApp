import mongoClient from "../bd/MongoBD/Connexion.js";
import winston from "winston";
import express from "express";
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
const collection = await mongoClient
  .db("BrodeurAppBD")
  .collection("logSessions");
//read
router.get("/", async (req, res) => {
  try {
    const logSessions = await collection.find().toArray();
    res.status(200).json(logSessions);
    logger.info("Fetch des logs de sessions effectué avec succès!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des logs des sessions : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des sessions" });
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const {
      id_utilisateur,
      nomComplet_utilisateur,
      username,
      email,
      debut_session,
      fin_session,
      raison_deconnexion,
    } = req.body;

    await collection.insertOne({
      id_utilisateur: id_utilisateur,
      nomComplet_utilisateur: nomComplet_utilisateur,
      username: username,
      email: email,
      debut_session: debut_session,
      fin_session: fin_session,
      raison_deconnexion: raison_deconnexion,
    });
    res.status(200).json({
      id_utilisateur: id_utilisateur,
      nomComplet_utilisateur: nomComplet_utilisateur,
      username: username,
      email: email,
      debut_session: debut_session,
      fin_session: fin_session,
      raison_deconnexion: raison_deconnexion,
    });
    logger.info("Succès lors du insert du log");
  } catch (err) {
    logger.error(`Erreur lors du update de la session : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des sessions" });
  }
});
//update
router.put("/:id", async (req, res) => {
  try {
    const {
      id_utilisateur,
      nomComplet_utilisateur,
      username,
      email,
      debut_session,
      fin_session,
      raison_deconnexion,
    } = req.body;
    const id = req.params.id;
    const resultat = collection.UpdateOne(
      { id_utilisateur: id },
      {
        $set: {
          id_utilisateur: id_utilisateur,
          nomComplet_utilisateur: nomComplet_utilisateur,
          username: username,
          email: email,
          debut_session: debut_session,
          fin_session: fin_session,
          raison_deconnexion: raison_deconnexion,
        },
      }
    );
    logger.info(`Update du logSession fait avec succès!`);
    res.status(200).json();
  } catch (err) {
    logger.error(`Erreur lors du update du logSesssions`);
    res.status(500).json({ message: "Erreur lors du update du logSessions" });
  }
});

export default router;
