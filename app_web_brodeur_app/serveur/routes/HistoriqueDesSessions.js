import mongoClient from "../bd/MongoBD/Connexion.js";
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

// Fonction pour se connecter à la collection MongoDB
async function ConnexionCollection() {
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
    const collection = await ConnexionCollection();

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
    const collection = await ConnexionCollection();
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
    await collection.insertOne(nouveauHistoriqueDeSession);
    logger.info(`insert sur historique des sessios effectué`);
    res
      .status(200)
      .json({ message: "Historique des sessions inséré avec succès!" });
  } catch (err) {
    logger.error("Erreur lors de la récupération des documents: ", err);
    res.status(500).json({ message: "Erreur du serveur" });
  }
});

//MODIFICATION
router.put("/:id", async (req, res) => {
  try {
    const collection = await ConnexionCollection();
    const id = req.params.id;
    const updatedHistoriqueDeSession = {
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
    console.log(updatedHistoriqueDeSession);
    const resultat = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedHistoriqueDeSession }
    );

    if (resultat.matchedCount === 0) {
      logger.warn(`Aucun document trouvé avec l'id ${id}`);
      return res.status(404).json({ message: "Document non trouvé" });
    }

    logger.info(`Historique de session avec id ${id} mis à jour`);
    res.status(200).json({ message: "Mise à jour réussie" });
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
