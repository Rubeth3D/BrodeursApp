import mongoClient from "../bd/MongoBD/Connexion.js"; // Assure-toi que la connexion MongoDB est bien exportée depuis ce fichier
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

// Fonction pour se connecter à la collection MongoDB
async function initCollection() {
  try {
    const collection = await mongoClient
      .db("mongoBrodeurApps")
      .collection("Historique_Des_Sessions");
    return collection;
  } catch (err) {
    logger.error("Erreur lors de l'accès à la collection MongoDB: ", err);
    throw new Error("Erreur lors de l'accès à la collection MongoDB");
  }
}

router.get("/", async (req, res) => {
  try {
    const collection = await initCollection();

    // Récupérer les documents
    const historiqueDesSessions = await collection.find({}).toArray();
    logger.info(`Documents récupérés: ${historiqueDesSessions.length}`);
    res.status(200).json(historiqueDesSessions);
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

router.post("/", async (req, res) => {
  try {
    const collection = await initCollection();
    const nouveauHistoriqueDeSession = {
      id_utilisateur: req.body.id_utilisateur,
      id_session: req.body.id_session,
      numeroDa: req.body.numeroDa,
      nom_utilisateur: req.body.nom_utilisateur,
      courriel: req.body.courriel,
      type_utilisateur: req.body.type_utilisateur,
      page: req.body.page,
      type_action: req.body.type_action,
      description_action: req.body.description_action,
      date_action: req.body.date_action,
    };
    console.log(nouveauHistoriqueDeSession);
    const commentaire = await collection.insertOne(nouveauHistoriqueDeSession);
    logger.info(`Historique des sessios effectué`);
    res.status(200).json(commentaire);
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

export default router;
