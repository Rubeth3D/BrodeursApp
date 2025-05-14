import express from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";

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
router.use(cors());

const InitAdmin = async () => {
  try {
    const selectAdmin = `SELECT * from utilisateur WHERE type_utilisateur = 'A'`;
    const resultat = await client.query(selectAdmin);

    if (resultat.rowCount < 1) {
      logger.info("Aucun Admin trouvé dans la base de données");

      const defaultAdmin = {
        nom_utilisateur: 'Admin',
        courriel: 'evaluationparlespairs@gmail.com',
        mot_de_passe: 'admin123',
        etat_utilisateur: 'Actif',
        type_utilisateur: 'A',
        date_creation: new Date(),
      };

      const motDePasseHasher = await bcrypt.hash(defaultAdmin.mot_de_passe, 10);

      const insertAdmin = `INSERT INTO utilisateur 
        (nom_utilisateur, courriel, mot_de_passe, etat_utilisateur, type_utilisateur, date_creation)
        VALUES ($1, $2, $3, $4, $5, $6)`;

      await client.query(insertAdmin, [
        defaultAdmin.nom_utilisateur,
        defaultAdmin.courriel,
        motDePasseHasher,
        defaultAdmin.etat_utilisateur,
        defaultAdmin.type_utilisateur,
        defaultAdmin.date_creation,
      ]);

      logger.info("Administrateur par défaut créé.");
    } else {
      logger.info("Administrateur déjà présent.");
    }
  } catch (err) {
    logger.error("Erreur lors de l'initialisation de l'administrateur :", err);
  }
};

export default InitAdmin;