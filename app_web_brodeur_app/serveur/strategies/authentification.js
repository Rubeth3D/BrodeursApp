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

export const verifierSessionUtilisateur = async (req, res, next) => {
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
        `SELECT * FROM session_utilisateur 
        WHERE id_session_utilisateur = $1 AND etat_session_utilisateur = 'A'`,
        [sessionId]
      );
  
      const session = result.rows[0];
  
      if (!session) {
        logger.warn(`Session introuvable : ID ${sessionId}`);
        return res.status(401).json({ authenticated: false, reason: "Session inconnue" });
      }

      const date = new Date();
      const expiration = new Date(session.date_jeton_expiration);
  
      if (date > expiration) {
        logger.info(`Session expirée : ID ${sessionId}`);
        const UpdateEtatSessionsQuery = `
            UPDATE session_utilisateur
            SET 
              etat_session_utilisateur = 'N'
            WHERE id_session_utilisateur = $1
          `;

        client.query(UpdateEtatSessionsQuery, [sessionId]);
        return res.status(401).json({ authenticated: false, reason: "Session expirée" });
      }
  
      logger.info(`La session ${sessionId} est valide`);
      req.sessionData = {
        authentification: true,
        utilisateurId: session.utilisateur_id_utilisateur,
        type: session.type_utilisateur,
      }
      /*return res.status(200).json({
        authentification: true,
        utilisateurId: session.utilisateur_id_utilisateur,
        type: session.type_utilisateur,
      });*/
      next();
    } catch (err) {
      logger.error("Erreur serveur lors de la vérification de session : " + err.message);
      return res.status(500).json({ authenticated: false, reason: "Erreur serveur" });
    }
  };