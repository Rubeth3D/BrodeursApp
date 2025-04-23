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

router.use(express.json());

//get pour avoir des informations sur le user connecter
//Pas d'information sensible
router.get("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    if(req.sessionData.authentification){
      logger.info("Session validée, récupération des cours");
      
      const parametre = req.sessionData.utilisateurId;
      const requete = `SELECT nom, prenom, nom_utilisateur, courriel, type_utilisateur from utilisateur WHERE id_utilisateur = $1`;
      const resultat = await client.query(requete, [parametre]);

      // Vérifie ici si tu récupères bien eu un utilisateur
      if (resultat.rows.length > 0) {
        logger.info("Get de l'utilisateur effectué avec succès");
        return res.status(200).json(resultat.rows);  // Renvoie les cours ici
      } else {
        logger.info("Aucun cours trouvé dans la base de données");
        return res.status(404).json({ message: "Aucun cours trouvé" });
      }
    }else{
      return res.status(401).json({ message: "Session Non Valide" });
    }
  } catch (error) {
    logger.error("Erreur lors de la récupération des cours : " + error.message);
    return res.status(500).json({ message: "Il y a eu une erreur de type 500" });
  }
});

//get pour un utilisateur
router.get("/:nom_user", async (req, res) => {
  try {
    const { nom_user, motDePasse } = req.params;

    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_user = $1",
      [nom_user]
    );

    if (resultat.rowCount == 0) {
      logger.error(`Aucun utilisateur ne correspond`);
      return res
        .status(404)
        .json({ message: `Aucun user n'a le nom_user :${nom_user}` });
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
router.get("/:nom_user/:motDePasse", async (req, res) => {
  try {
    const { nom_user, motDePasse } = req.params;

    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_user = $1",
      [nom_user]
    );

    if (resultat.rowCount == 0) {
      logger.error(`Aucun utilisateur ne correspond`);
      return res
        .status(404)
        .json({ message: `Aucun user n'a le nom_user :${nom_user}` });
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
    logger.error(`Erreur lors de la: ${err}`);
  }
});

//post pour un utilisateur
router.post("/", async (req, res) => {
  try {
    const {
      nom,
      prenom,
      nom_utilisateur,
      courriel,
      mot_passe,
      numero_da,
      etat_utilisateur,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
      date_creation,
    } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const mot_de_passe_hash = await bcrypt.hash(mot_passe, salt);
    logger.info(
      nom,
      prenom,
      nom_utilisateur,
      courriel,
      mot_passe,
      numero_da,
      etat_utilisateur,
      type_utilisateur,
      professeur_id_professeur,
      etudiant_id_etudiant,
      date_creation
    );
    // Correction de la syntaxe de la requête SQL
    const resultat = await client.query(
      "INSERT INTO utilisateur(nom,prenom,nom_utilisateur,courriel,mot_passe,numero_da,etat_utilisateur,type_utilisateur,professeur_id_professeur,etudiant_id_etudiant,date_creation) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)",
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

    if(type_utilisateur === "E"){
      const resultat = await client.query(
        "INSERT INTO etudiant(nom_complet,prenom,nom_utilisateur,courriel,mot_passe,numero_da,etat_utilisateur,type_utilisateur,professeur_id_professeur,etudiant_id_etudiant,date_creation) VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9,$10,$11)",
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
    }
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

export default router;
