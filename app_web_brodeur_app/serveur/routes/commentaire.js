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
async function ConnexionCollection() {
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

//GET
router.get("/", async (req, res) => {
  try {
    const collection = await ConnexionCollection();

    // Récupérer les documents
    const commentaire = await collection.find({}).toArray();
    logger.info(`Documents récupérés: ${commentaire.length}`);
    res.status(200).json(commentaire);
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

//POST
router.post("/", async (req, res) => {
  try {
    const collection = await ConnexionCollection();
    const nouveauCommentaire = {
      id_utilisateur: req.body.id_utilisateur,
      nom_utilisateur: req.body.nom_utilisateur,
      type_utilisateur: req.body.type_utilisateur,
      commentaire: req.body.commentaire,
    };
    const commentaire = await collection.insertOne(nouveauCommentaire);
    logger.info(`Commentaire effectué`);
    res.status(200).json(commentaire);
  } catch (err) {
    logger.error("Erreur lors de la création des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

//MODIFICATION
router.put("/:id", async (req, res) => {
  try {
    const collection = await ConnexionCollection();
    const id = req.params.id;
    const commentaire = req.body; 

    const resultat = await collection.updateOne(
      { _id: new ObjectId(id) }, 
      { $set: { commentaire } } 
    );

    if (resultat.matchedCount === 0) {
      logger.warn(`Aucun commentaire trouvé avec l'id ${id}`);
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    logger.info(`Commentaire avec id ${id} mis à jour`);
    res.status(200).json({ message: "Commentaire mis à jour avec succès" });
  } catch (err) {
    logger.error("Erreur lors de la mise à jour du commentaire :", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const collection = await ConnexionCollection();
    const id = req.params.id;

    console.log(id);
    const resultat = await collection.deleteOne({ _id: new ObjectId(id) });

    if (resultat.deletedCount === 0) {
      logger.warn(`Aucun document trouvé avec l'id ${id}`);
      return res.status(404).json({ message: "Document non trouvé" });
    }
    logger.info(`Document avec id ${id} supprimé`);
    res.status(200).json({ message: "Document supprimé avec succès" });
  } catch (err) {
    logger.error("Erreur lors de la suppression du document :", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});
export default router;
