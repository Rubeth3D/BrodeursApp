import express from "express";
import cors from "cors";
import winston from "winston";
//@ts-ignore
import client from "../bd/postgresBD/Connexion.js";
import { verifierSessionUtilisateur } from "../strategies/authentification.js";

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

// GET les cours
router.get("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    // Log avant la récupération des cours pour vérifier que la fonction suivante s'exécute
    if (req.sessionData.authentification) {
      logger.info("Session validée, récupération des cours");
      console.log("Id de session active : ", req.sessionData);
      const resultatPourAffichage = await client.query(
        "SELECT id_cours, code_cours,session_id_session, description_cours,etat_cours,code_session FROM cours JOIN session on session_id_session = id_session"
      );

      // Vérifie ici si tu récupères bien les cours
      if (resultatPourAffichage.rows.length > 0) {
        logger.info("Get des cours effectué avec succès");
        return res.status(200).json(resultatPourAffichage.rows); // Renvoie les cours ici
      } else {
        logger.info("Aucun cours trouvé dans la base de données");
        return res.status(404).json(resultatPourAffichage.rows);
      }
    } else {
      return res.status(401).json({ message: "Session Non Valide" });
    }
  } catch (error) {
    logger.error("Erreur lors de la récupération des cours : " + error.message);
    return res
      .status(500)
      .json({ message: "Il y a eu une erreur de type 500" });
  }
});

// Get d'un cours par le id
router.get("/:id", async (req, res) => {
  try {
    const { idCours } = req.params;
    const result = await client.query(
      "SELECT * FROM cours WHERE id_cours = $1",
      [idCours]
    );
    if (result.rows.length === 0) {
      logger.error("Cours non trouve");
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    logger.info("Get du cours effectue avec succes");
    res.status(200).json(result.rows);
  } catch (err) {
    logger.error(`Erreur lors du fetch du cours : ${err}`);
    res.status(500).json({ message: "Erreur de serveur" });
  }
});

// Insert d'un cours
router.post("/", async (req, res) => {
  try {
    const { code_cours, description_cours, etat_cours, session_id_session } =
      req.body;
    const result = await client.query(
      "INSERT INTO cours (code_cours, description_cours, etat_cours, session_id_session) VALUES ($1, $2, $3, $4) RETURNING *",
      [code_cours, description_cours, etat_cours, session_id_session]
    );
    logger.info("Cours inséré avec succès");
    res.status(200).json(result.rows[0]);
  } catch (err) {
    logger.error(`Erreur lors du insert du cours : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion du cours" });
  }
});

// Update d'un cours
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code_cours, description_cours, etat_cours, session_id_session } =
      req.body;
    const result = await client.query(
      "UPDATE cours SET code_cours = $1, description_cours = $2, etat_cours = $3, session_id_session = $4 WHERE id_cours = $5 RETURNING *",
      [code_cours, description_cours, etat_cours, session_id_session, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    logger.info("Cours mis à jour avec succès");
    res
      .status(200)
      .json({ message: "Cours mis à jour avec succès", cours: result.rows[0] });
  } catch (error) {
    logger.error(`Erreur lors du update du cours : ${err}`);
    res.status(500).json({ message: "Erreur de mise à jour du cours" });
  }
});

// DELETE un cours
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      "DELETE FROM cours WHERE id_cours = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      logger.error("Ce cours n'existe pas dans la table");
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    logger.info("Cours supprimé avec succès");
    res.status(200).json({ message: "Cours supprimé avec succès" });
  } catch (err) {
    logger.error(`Erreur lors du delete du cours : ${err}`);
    res.status(500).json({ message: "Erreur de suppression du cours" });
  }
});

export default router;
