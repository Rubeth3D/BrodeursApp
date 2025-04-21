import express from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import { decrypt } from "../utils/crypto.js";

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
router.use(cors());

router.get("/", async (req, res) => {
    logger.log("je suis rentré");
    const encryptedSessionId = req.cookies?.session_id;
    if (!encryptedSessionId) {
      logger.warn("Session absente dans le cookie.");
      return res.status(401).json({ authenticated: false, reason: "Session absente" });
    }
  
    let sessionId;
    try {
      sessionId = decrypt(encryptedSessionId);
    } catch (err) {
      logger.error("Erreur de déchiffrement de session : " + err.message);
      return res.status(401).json({ authenticated: false, reason: "Session invalide" });
    }
  
    try {
      const result = await client.query(
        `SELECT * FROM session_utilisateur WHERE id_session_utilisateur = $1`,
        [sessionId]
      );
  
      const session = result.rows[0];
  
      if (!session) {
        logger.warn(`Session introuvable : ID ${sessionId}`);
        return res.status(401).json({ authenticated: false, reason: "Session inconnue" });
      }
  
      if (session.etat_session_utilisateur !== "active") {
        logger.info(`Session inactive : ID ${sessionId}`);
        return res.status(403).json({ authenticated: false, reason: "Session inactive" });
      }
  
      const now = new Date();
      const expiration = new Date(session.date_jeton_expiration);
  
      if (now > expiration) {
        logger.info(`Session expirée : ID ${sessionId}`);
        return res.status(401).json({ authenticated: false, reason: "Session expirée" });
      }
  
      logger.info(`Session OK pour l'utilisateur ${session.utilisateur_id_utilisateur}`);
      return res.status(200).json({
        authenticated: true,
        utilisateurId: session.utilisateur_id_utilisateur,
        type: session.type_utilisateur,
      });
    } catch (err) {
      logger.error("Erreur serveur lors de la vérification de session : " + err.message);
      return res.status(500).json({ authenticated: false, reason: "Erreur serveur" });
    }
  });

  export default router;