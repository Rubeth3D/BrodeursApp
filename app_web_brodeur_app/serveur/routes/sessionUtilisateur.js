import express, { json, query } from "express";
import cors from "cors";
import winston, { log } from "winston";
import connexionPostgres from "../bd/postgresBD/Connexion.js";

//route de cedryk lelightskin
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

router.get("/VerifierCookies", async (req, res) => {
  try {
    if (!req.cookies.UserData) {
      logger.error("Acces refuse : cookie manquant !");
      return res.status(401).json({ message: "Accès refusé, cookie manquant" });
    }
    logger.info("Connexion...");
    var cookieData;
    var resultat;
    try {
      cookieData = JSON.parse(req.cookies.UserData);
      logger.info(cookieData.idSession);

      //après vérifier que le idSession est bon dans la bd
      resultat = await client.query(
        "SELECT * FROM utilisateur WHERE id_user = $1",
        [cookieData.idSession]
      );
    } catch (error) {
      return res.status(400).json({ message: "Cookie invalide" });
    }
    if (resultat.rowCount == 0) {
      logger.error(`Aucun user n'a le id de Session : ${cookieData.idSession}`);
      return res.status(404).json({
        message: `Aucun user n'a le id de Session :${cookieData.idSession}`,
      });
    }
    res.status(200).json(resultat.rows[0]);
    logger.info("Get du user effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get du user : ${err}`);
    res.status(500).json({ message: "Erreur lors du get du user" });
  }
});
//Fonction de logout qui detruit le cookie du user
router.get("/Deconnexion", async (req, res) => {
  logger.info("Deconnexion...");
  if (!req.cookies.UserData) {
    logger.error("Acces refuse : cookie manquant !");
    return res.status(401).json({ message: "Accès refusé, cookie manquant" });
  }
  res.clearCookie("UserData");
  logger.info("Utilisateur deconnecte avec succes");
  return res.status(200).json({ message: "Deconnexion reussi !" });
});
//vérifier la connexion d'un utilisateur

//post pour une session utilisateur
router.post("/", async (req, res) => {
  try {
    const {
      id_session_utilisateur,
      sel,
      token_init,
      date_connexion,
      date_jeton_expiration,
      tentatives_echoues,
      date_derniere_connexion,
      ip_derniere_connexion,
      type_utilisateur,
      utilisateur_id_utilisateur,
      etat_session_utilisateur,
    } = req.body;
    const resultat = connexionPostgres.query(
      "INSERT INTO session_utilisateur(id_session_utilisateur,sel,token_init,date_connexion,date_jeton_expiration,tentatives_echoues,date_derniere_connexion,date_derniere_tentative,ip_derniere_tentative,ip_derniere_connexion,type_utilisateur,utilisateur_id_utilisateur,etat_session_utilisateur) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *"[
        (id_session_utilisateur,
        sel,
        token_init,
        date_connexion,
        date_jeton_expiration,
        tentatives_echoues,
        date_derniere_connexion,
        ip_derniere_connexion,
        type_utilisateur,
        utilisateur_id_utilisateur,
        etat_session_utilisateur)
      ]
    );
    logger.info(resultat.row[0]);
    res.status(200);
  } catch (err) {
    logger.error(`Erreur lors du insert de la sessionUtilisateur : ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors du insert de la sessionUtilisateur" });
  }
});
router.put("/", async (req, res) => {
  const resultat = await client.query(
    "UPDATE ON utilisateur SET id_session_utilisateur = $1, sel = $2, token_init = $3, date_connexion = $4, date_jeton_expiration = $5, tentatives_echoues = $6, date_derniere_connexion = $7,ip_derniere_connexion = $8, type_utilisateur = $9, utilisateur_id_utilisateur = $10 , etat_session_utilisateur = $11 WHERE id_user = $8 RETURNING *"[
      (id_session_utilisateur,
      sel,
      token_init,
      date_connexion,
      date_jeton_expiration,
      tentatives_echoues,
      date_derniere_connexion,
      ip_derniere_connexion,
      type_utilisateur,
      utilisateur_id_utilisateur,
      etat_session_utilisateur)
    ]
  );
});
