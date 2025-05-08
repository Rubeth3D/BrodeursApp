import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";
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

//get pour avoir des informations sur le user connecter
//Pas d'information sensible
router.get("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    const parametre = req.sessionData.utilisateurId;
    console.log(parametre);
    const requete = `SELECT id_utilisateur, nom, prenom, nom_utilisateur, courriel, type_utilisateur from utilisateur WHERE id_utilisateur = $1`;
    const resultat = await client.query(requete, [parametre]);

    // Vérifie ici si tu récupères bien eu un utilisateur
    if (resultat.rows.length > 0) {
      logger.info("Get de l'utilisateur effectué avec succès");
      return res.status(200).json(resultat.rows); 
    } else {
      logger.info("Aucun utilisateur trouvé dans la base de données");
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
  } catch (error) {
    logger.error("Erreur lors de la récupération des utilisateur : " + error.message);
    return res
      .status(500)
      .json({ message: "Il y a eu une erreur de type 500" });
  }
});
//Envoie le code que celui voulant s'inscrire doit entrer

//verifie le code envoye a l'utilisateur
router.get("verifierCode", (req, res) => {});
//get pour un utilisateur
router.get("/:nom_utilisateur", async (req, res) => {
  try {
    logger.info("/:nom_utilisateur");
    const { nom_utilisateur, motDePasse } = req.params;
    console.log("Nom utilisateur : ", nom_utilisateur);
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_utilisateur = $1",
      [nom_utilisateur]
    );

    if (resultat.rowCount == 0) {
      logger.error(`Aucun utilisateur ne correspond`);
      return res.status(404).json({
        message: `Aucun user n'a le nom_utilisateur :${nom_utilisateur}`,
      });
    }
    logger.info("Connexion de l'utilisateur effectuer avec succes!");
    return res.status(200).json([{ message: "Connexion réussie!" }]);
  } catch (err) {
    logger.error(`Erreur lors de la connexion de l'utilisateur : ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur" });
    logger.error(`Erreur lors de la: ${err}`);
  }
});

//autre
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
router.get("/:nom_utilisateur/:motDePasse", async (req, res) => {
  try {
    logger.info("/:nom_utilisateur/:motDePasse");
    const { nom_utilisateur, motDePasse } = req.params;

    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_utilisateur = $1",
      [nom_utilisateur]
    );

    if (resultat.rowCount == 0) {
      logger.error(`Aucun utilisateur ne correspond`);
      return res.status(404).json({
        message: `Aucun user n'a le nom_utilisateur :${nom_utilisateur}`,
      });
    }
    const utilisateur = resultat.rows[0];
    const isMatch = await bcrypt.compare(
      `${motDePasse}`,
      utilisateur.mot_de_passe
    );
    if (!isMatch) {
      logger.error("Cet utilisateur ne possede pas ce mot de passe!");
      return res.status(401).json({
        message: "Le mot de passe ou le nom d'utilisateur est mauvais",
      });
    }

    res
      //cookie expire après 1h
      .cookie(
        "UserData",
        JSON.stringify({
          idSession: utilisateur.id_user,
          connection: "Connect",
          role: "Utilisateur",
        }),
        {
          maxAge: 60000 * 60,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        }
      );

    logger.info("Connexion de l'utilisateur effectuer avec succes!");
    return res.status(200).json([{ message: "Connexion réussie!" }]);
  } catch (err) {
    logger.error(`Erreur lors de la connexion de l'utilisateur : ${err}`);
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion de l'utilisateur" });
    logger.error(`Erreur lors de la connexion de l'utilisateur : ${err}`);
  }
});

//post pour un utilisateur
router.post("/", async (req, res) => {
  try {
    const {
      nom,
      prenom,
      nom_utilisateur,
      mot_de_passe,
      numero_da,
      etat_utilisateur,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
    } = req.body;
    const date_creation = new Date(Date.now()).toISOString();
    const salt = bcrypt.genSaltSync(10);
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, salt);
    logger.info(
      "utilisateur :",
      nom,
      prenom,
      nom_utilisateur,
      courriel,
      mot_de_passe,
      numero_da,
      etat_utilisateur,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
      date_creation
    );
    // Correction de la syntaxe de la requête SQL
    const resultat = await client.query(
      "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,courriel,mot_de_passe,numero_da,etat_utilisateur,type_utilisateur,professeur_id_professeur,etudiant_id_etudiant,date_creation) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11) RETURNING id_utilisateur",
      [
        nom,
        prenom,
        nom_utilisateur,
        courriel,
        mot_de_passe_hash,
        numero_da,
        etat_utilisateur,
        type_utilisateur,
        professeur_id_professeur,
        etudiant_id_etudiant,
        date_creation,
      ]
    );
    const utilisateur = resultat.rows[0];
    console.log(utilisateur);
    if (type_utilisateur === "E") {
      const resultat = await client.query(
        "INSERT INTO etudiant(nom_complet,utilisateur_id_utilisateur,etat_etudiant) VALUES($1, $2, $3) RETURNING id_etudiant",
        [nom_utilisateur, utilisateur.id_utilisateur, "A"]
      );
      const etudiant = resultat.rows[0];
      console.log(etudiant);
      await client.query(
        "UPDATE utilisateur SET etudiant_id_etudiant = $1 WHERE id_utilisateur = $2",
        [etudiant.id_etudiant, utilisateur.id_utilisateur]
      );
      logger.info(etudiant);
    } else {
      const resultat = await client.query(
        "INSERT INTO professeur(nom_complet,utilisateur_id_utilisateur,etat_professeur) VALUES($1, $2, $3) RETURNING id_professeur",
        [nom_utilisateur, utilisateur.id_utilisateur, "A"]
      );
      const professeur = resultat.rows[0];
      logger.info(professeur);
      await client.query(
        "UPDATE utilisateur SET professeur_id_professeur = $1 WHERE id_utilisateur = $2",
        [professeur.id_professeur, utilisateur.id_utilisateur]
      );
    }
    logger.info("Insertion de l'utilisateur effectuée avec succès");
    return res.status(200).json({ message: "succes" });
  } catch (err) {
    logger.error(`Erreur lors de l'insertion : ${err}`);
    res.status(500).json({ message: "Erreur lors de l'insertion" });
  }
});

//put pour un utilisateur

//delete pour un utilisateur
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM utilisateur WHERE id_utilisateur = $1 RETURNING *",
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
//verifier si etudiant existe

export default router;
