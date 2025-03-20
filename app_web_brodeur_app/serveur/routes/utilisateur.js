import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/connexion.js";

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

//get pour les utilisateurs
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM utilisateur");
    res.status(200).json(resultat.rows);
    logger.info("Get des user effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des user : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des user!" });
  }
});

//get pour un utilisateur
router.get("/:nom_user", async (req, res) => {
  try {
    if (!req.cookies.UserData) {
      return res.status(401).json({ message: "Accès refusé, cookie manquant" });
    }

    let cookieData;
    try {
      cookieData = JSON.parse(req.cookies.UserData);
      //après vérifier que le idSession est bon dans la bd
    } catch (error) {
      return res.status(400).json({ message: "Cookie invalide" });
    }

    const { nom_user } = req.params;
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_user = $1",
      [nom_user]
    );

    if (resultat.rowCount == 0) {
      logger.error(`Aucun user n'a le nom_user : ${nom_user}`);
      return res
        .status(404)
        .json({ message: `Aucun user n'a le nom_user :${nom_user}` });
    }
    res.status(200).json(resultat.rows[0]);
    logger.info("Get du user effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get du user : ${err}`);
    res.status(500).json({ message: "Erreur lors du get du user" });
  }
});

//vérifier la connexion d'un utilisateur
router.get("/:nom_user/:motDePasse", async (req, res) => {
  try {
    const { nom_user, motDePasse } = req.params;
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_user = $1 AND mot_de_passe = $2",
      [nom_user, motDePasse]
    );
    if (resultat.rowCount == 0) {
      logger.error(`Aucun utilisateur ne correspond`);
      return res
        .status(404)
        .json({ message: `Aucun user n'a le nom_user :${nom_user}` });
    }
    const utilisateur = resultat.rows[0];

    res
      //cookie expire après 1h
      .cookie(
        "Utilisateur_Session",
        JSON.stringify({
          idSession: 1,
          nomUser: `${utilisateur.nom_user}`,
          connection: "Connect",
          role: `${utilisateur.type_utilisateur}`,
        }),
        {
          maxAge: 60000 * 60,
        }
      );

    logger.info("Connexion de l'utilisateur effectuer avec succes!");
    return res.status(200).json(utilisateur);
  } catch (err) {
    logger.error(`Erreur lors de la connexion de l'utilisateur : ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur" });
    logger.error(`Erreur lors de la: ${err}`);
  }
});

//post pour un utilisateur
router.post("/", async (req, res) => {
  try {
    const {
      nom_user,
      mot_de_passe,
      email,
      type_utilisateur,
      id_professeur,
      id_etudiant,
      etat_utilisateur,
    } = req.body;

    logger.info(
      nom_user,
      mot_de_passe,
      email,
      type_utilisateur,
      id_professeur,
      id_etudiant,
      etat_utilisateur
    );
    // Correction de la syntaxe de la requête SQL
    const resultat = await client.query(
      "INSERT INTO utilisateur(nom_user, mot_de_passe, email, type_utilisateur, id_professeur, id_etudiant, etat_utilisateur) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        nom_user,
        mot_de_passe,
        email,
        type_utilisateur,
        id_professeur,
        id_etudiant,
        etat_utilisateur,
      ]
    );

    // Afficher le résultat de l'insertion pour le debug
    logger.info(resultat.rows[0]); // Affiche la première ligne insérée

    res.status(200).json({ message: "Inscription faite avec succès" });
    logger.info("Insertion de l'utilisateur effectuée avec succès");
  } catch (err) {
    logger.error(`Erreur lors de l'insertion : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
});

//put pour un utilisateur
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const {
      nomUser,
      motDePasse,
      email,
      typeUtilisateur,
      idProfesseur,
      idEtudiant,
      etatUtilisateur,
    } = req.body;

    const resultat = await client.query(
      "UPDATE ON utilisateur SET nom_user = $1, mot_de_passe = $2, email = $3, type_utilisateur = $4, id_professeur = $5, id_etudiant = $6, etat_utilisateur = $7 WHERE id_user = $8 RETURNING *"[
        (nomUser,
        motDePasse,
        email,
        typeUtilisateur,
        idProfesseur,
        idEtudiant,
        etatUtilisateur,
        id)
      ]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun utilisateur ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun utilisateur ne correspond a ce id" });
    }
    res.status(200).json({ message: "Update fait avec succes!" });
    logger.info("Update fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

//delete pour un utilisateur

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM utilisateur WHERE id = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun utilisateur ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun utilisateur ne correspond a ce id" });
    }

    res.status(200).json({ message: "Cours retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du cours" });
    logger.error(`Erreur lors du delete du cours ${err}`);
  }
});

export default router;
