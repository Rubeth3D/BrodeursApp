import mongoClient from "../../bd/MongoBD/Connexion.js";
import winston from "winston";
import express from "express";
import { ObjectId } from "mongodb";
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
    return res
      .status(500)
      .json({ message: "Erreur lors du fetch des sessions" });
  }
});
//create
router.post("/", async (req, res) => {
  try {
    const {
      id_utilisateur,
      numero_DA,
      nomComplet_utilisateur,
      username,
      email,
      debut_session,
      fin_session,
      raison_deconnexion,
    } = req.body;

    await collection.insertOne({
      id_utilisateur: id_utilisateur,
      numero_DA: numero_DA,
      nomComplet_utilisateur: nomComplet_utilisateur,
      username: username,
      email: email,
      debut_session: debut_session,
      fin_session: fin_session,
      raison_deconnexion: raison_deconnexion,
    });
    res.status(200).json({
      id_utilisateur: id_utilisateur,
      numero_DA: numero_DA,
      nomComplet_utilisateur: nomComplet_utilisateur,
      username: username,
      email: email,
      debut_session: debut_session,
      fin_session: fin_session,
      raison_deconnexion: raison_deconnexion,
    });
    logger.info("Succès lors du insert du log");
  } catch (err) {
    logger.error(`Erreur lors du update du logSession : ${err}`);
    return res
      .status(500)
      .json({ message: "Erreur lors du fetch des logSessions " });
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
    const resultat = await collection.updateOne(
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
    logger.error(`Erreur lors du update du logSesssions ${err}`);
    return res
      .status(500)
      .json({ message: "Erreur lors du update du logSessions" });
  }
});
//delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const resultat = await collection.deleteOne({
      _id: objectId,
    });
    if (resultat.deletedCount === 0) {
      logger.error(`Aucun logSessions n'a le id ${id}`);
      return res
        .status(404)
        .json({ message: "Aucun log de session ne correspond a ce id" });
    }
    return res
      .status(200)
      .json({ message: "Delete du logSession effectué avec succès!" });
  } catch (err) {
    logger.error(`Erreur lors du delete du logSessions : ${err}`);
    return res
      .status(500)
      .json({ message: "Erreur lors du delete du logSessions" });
  }
});

export default router;
