import express from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";

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

//Te reconnais seulement si le serveur n'a pas redémarer
export const verifierSessionUtilisateur = async (req, res, next) => {
  if (!req.isAuthenticated() || !req.user) {
    logger.warn("Utilisateur non authentifié (passport)");E
    return res
      .status(401)
      .json({ authenticated: false, reason: "Non authentifié" });
  }
  const sessionId = req.user.id_session_utilisateur;

  try {
    const result = await client.query(
      `SELECT * FROM session_utilisateur 
       WHERE id_session_utilisateur = $1 
       AND etat_session_utilisateur = 'A' 
       ORDER BY date_jeton_expiration DESC 
       LIMIT 1`,
      [sessionId]
    );

    const session = result.rows[0];

    if (!session) {
      logger.warn("Aucune session active trouvée en BD");
      return res
        .status(401)
        .json({ authenticated: false, reason: "Session non trouvée" });
    }

    const maintenant = new Date();
    const expiration = new Date(session.date_jeton_expiration);

    if (maintenant > expiration) {
      logger.info(
        `Session expirée pour l'utilisateur ${req.user.utilisateur_id_utilisateur}`
      );

      await client.query(
        `UPDATE session_utilisateur SET etat_session_utilisateur = 'I' WHERE id_session_utilisateur = $1`,
        [session.id_session_utilisateur]
      );

      req.logout((err) => {
        if (err) {
          logger.error("Erreur lors du logout :", err);
        }
      });

      return res
        .status(401)
        .json({ authenticated: false, reason: "Session expirée" });
    }

    logger.info(
      `Session valide pour l'utilisateur ${req.user.utilisateur_id_utilisateur}`
    );

    req.sessionData = {
      authentification: true,
      type: req.user.type_utilisateur,
    };

    return next();
  } catch (err) {
    logger.error("Erreur lors de la vérification de session : " + err.message);
    return res
      .status(500)
      .json({ authenticated: false, reason: "Erreur serveur" });
  }
};
