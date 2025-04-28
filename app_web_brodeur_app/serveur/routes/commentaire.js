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
      .collection("Commentaire");
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
    const commentaire = await collection.find({}).toArray();
    logger.info(`Documents récupérés: ${commentaire.length}`);
    res.status(200).json(commentaire);
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

router.post("/", async (req, res) => {
  try {
    const collection = await initCollection();
    //const { id_utilisateur, nom_utilisateur, type_utilisateur, commentaire } = req.body;
    const nouveauCommentaire = {
      id_utilisateur: req.id_utilisateur,
      nom_utilisateur: req.nom_utilisateur,
      type_utilisateur: req.type_utilisateur,
      commentaire: req.commentaire,
    };
    console.log(nouveauCommentaire);
    const commentaire = await collection.insertOne(nouveauCommentaire);
    logger.info(`Commentaire effectué`);
    res.status(200).json(commentaire);
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});
export default router;
