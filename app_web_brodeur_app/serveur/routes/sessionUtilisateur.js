import express, { json, query } from "express";
import cors from "cors";
import winston, { log } from "winston";
import connexionPostgres from "../bd/postgresBD/Connexion.js";
import { Strategy } from "passport-local";
import passport from "passport";

// import { expresssession} from "module";
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

// router.get("/VerifierCookies", async (req, res) => {
//  );

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
router.post("/CreationCompte", async (req, res) => {
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
      "INSERT INTO session_utilisateur(id_session_utilisateur,sel,token_init,date_connexion,date_jeton_expiration,tentatives_echoues,date_derniere_connexion,date_derniere_tentative,ip_derniere_tentative,ip_derniere_connexion,type_utilisateur,utilisateur_id_utilisateur,etat_session_utilisateur) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *"(
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
        etat_session_utilisateur
      )
    );
    res
      .status(200)
      //cookie expire après 1h
      .cookie(
        "UserData",
        JSON.stringify({
          idSession: resultat.id_session_utilisateur,
          connection: "Connect",
        }),
        {
          maxAge: 60000 * 60,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        }
      );
  } catch (err) {
    logger.error(`Erreur lors du insert de la sessionUtilisateur : ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors du insert de la sessionUtilisateur" });
  }
});
router.put("/Connexion", async (req, res) => {
  try {
    if (!req.cookies.UserData) {
      logger.error("Acces refuse : cookie manquant !");
      return res.status(401).json({ message: "Accès refusé, cookie manquant" });
    }
    logger.info("Connexion...");
    var cookieData;
    try {
      cookieData = JSON.parse(req.cookies.UserData);
      logger.info(cookieData.idSession);

      //après vérifier que le idSession est bon dans la bd
      resultat = await client.query(
        "SELECT * FROM session_utilisateur WHERE id_session_utilisateur = $1 RETURNING *",
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
