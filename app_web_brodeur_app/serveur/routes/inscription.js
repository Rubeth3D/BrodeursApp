import express, { json, query } from "express";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
import oAuth2Client from "../api/oAuth2Client.js";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import creerId from "../strategies/creerId.js";
import { cli } from "winston/lib/winston/config/index.js";
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

router.get("/etudiantExiste/:nom_complet", async (req, res) => {
  try {
    const { nom_complet } = req.params;
    console.log("Nom complet : ", nom_complet);
    const resultat = await client.query(
      "SELECT FROM etudiant WHERE nom_complet = $1 AND etat_etudiant = 'Inactif'",
      [nom_complet]
    );

    if (resultat.rowCount === 0) {
      logger.info("L'etudiant n'existe pas!");
      return res
        .status(404)
        .json({ message: "Vous n'existez pas en tant qu'étudiant" });
    }
    return res.status(200).json({ message: "Code de verification envoye!" });
  } catch (err) {
    logger.error(
      "Erreur lors de la verification de l'existance de l'etudiant : ",
      err
    );
    return res.status(500).json({
      message:
        " Erreur serveur, veuillez contactez l'equipe de developpement a l'adresse : arnaudkomodo@gmail.com",
    });
  }
});

//verifier si professeur existe
router.get("/professeurExiste/:nom_complet", async (req, res) => {
  try {
    const { nom_complet } = req.params;
    const resultat = await client.query(
      "SELECT FROM professeur WHERE nom_complet = $1 AND etat_professeur = 'Inactif'",
      [nom_complet]
    );

    if (resultat.rowCount === 0) {
      logger.info("Le professeur n'existe pas!");
      return res
        .status(404)
        .json({ message: "Vous n'existez pas en tant que professeur" });
    }
    return res.status(200).json({ message: "Code de verification envoye!" });
  } catch (err) {
    logger.error(
      "Erreur lors de la verification de l'existance du professeur : ",
      err
    );
    return res.status(500).json({
      message:
        " Erreur serveur, veuillez contactez l'equipe de developpement a l'adresse : arnaudkomodo@gmail.com",
    });
  }
});

router.post("/CreationCompte/Professeur", async (req, res) => {
  try {
    const { courriel } = req.body;
    const type_utilisateur = "P";

    const utilisateurExistant = await client.query(
      `SELECT * FROM utilisateur WHERE courriel = $1`,
      [courriel]
    );
    if (utilisateurExistant.rowCount > 0) {
      logger.info("Le compte existe deja");
      return res.status(400).json({ message: "Compte existe deja" });
    }

    // Création de l'utilisateur
    const requeteQuery = `
      INSERT INTO utilisateur (courriel, etat_utilisateur, type_utilisateur)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const creerUtilisateur = await client.query(requeteQuery, [
      courriel,
      "Inactif",
      type_utilisateur,
    ]);

    // Vérification : un utilisateur a bien été inséré
    if (creerUtilisateur.rowCount === 0) {
      logger.info("Échec de la création de l'utilisateur.");
      return res.status(400).json({ message: "Échec création utilisateur." });
    }

    const id_utilisateur = creerUtilisateur.rows[0].id_utilisateur;

    // Création du professeur lié à l'utilisateur
    const requeteQueryProfesseur = `
      INSERT INTO professeur (utilisateur_id_utilisateur, etat_professeur)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const creerProfesseur = await client.query(requeteQueryProfesseur, [
      id_utilisateur,
      "Inactif",
    ]);

    // Vérification : un professeur a bien été inséré
    if (creerProfesseur.rowCount === 0) {
      logger.info("Échec de la création du professeur.");
      return res.status(400).json({ message: "Échec création professeur." });
    }

    const id_professeur = creerProfesseur.rows[0].id_professeur;

    // Mise à jour de l'utilisateur avec l'id du professeur
    const requeteUpdateUtilisateur = `
      UPDATE utilisateur
      SET professeur_id_professeur = $1
      WHERE id_utilisateur = $2;
    `;
    await client.query(requeteUpdateUtilisateur, [
      id_professeur,
      id_utilisateur,
    ]);

    logger.info("Création du compte professeur réussie !");
    return res
      .status(200)
      .json({ message: "Compte professeur créé avec succès !" });
  } catch (err) {
    logger.error("Erreur lors de la création du compte professeur :", err);
    return res.status(500).json({ message: "Erreur serveur : " + err.message });
  }
});

router.post("/CreationCompte/Etudiant", async (req, res) => {
  try {
    const { courriel } = req.body;
    const type_utilisateur = "E";

    const utilisateurExistant = await client.query(
      `SELECT * FROM utilisateur WHERE courriel = $1`,
      [courriel]
    );
    if (utilisateurExistant.rowCount > 0) {
      logger.info("Le compte existe deja");
      return res.status(400).json({ message: "Compte existe deja" });
    }

    // Création de l'utilisateur
    const requeteQuery = `
      INSERT INTO utilisateur (courriel, etat_utilisateur, type_utilisateur)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const creerUtilisateur = await client.query(requeteQuery, [
      courriel,
      "Inactif",
      type_utilisateur,
    ]);

    // Vérification : un utilisateur a bien été inséré
    if (creerUtilisateur.rowCount === 0) {
      logger.info("Échec de la création de l'utilisateur.");
      return res.status(400).json({ message: "Échec création utilisateur." });
    }

    const id_utilisateur = creerUtilisateur.rows[0].id_utilisateur;

    // Création de l'étudiant lié à l'utilisateur
    const requeteQueryEtudiant = `
      INSERT INTO etudiant (utilisateur_id_utilisateur, etat_etudiant)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const creerEtudiant = await client.query(requeteQueryEtudiant, [
      id_utilisateur,
      "Inactif",
    ]);

    // Vérification : un étudiant a bien été inséré
    if (creerEtudiant.rowCount === 0) {
      logger.info("Échec de la création de l'étudiant.");
      return res.status(400).json({ message: "Échec création étudiant." });
    }

    const id_etudiant = creerEtudiant.rows[0].id_etudiant;

    // Mise à jour de l'utilisateur avec l'id de l'étudiant
    const requeteUpdateUtilisateur = `
      UPDATE utilisateur
      SET etudiant_id_etudiant = $1
      WHERE id_utilisateur = $2;
    `;
    await client.query(requeteUpdateUtilisateur, [id_etudiant, id_utilisateur]);

    logger.info("Création du compte étudiant réussie !");
    return res
      .status(200)
      .json({ message: "Compte étudiant créé avec succès !" });
  } catch (err) {
    logger.error("Erreur lors de la création du compte étudiant :", err);
    return res.status(500).json({ message: "Erreur serveur : " + err.message });
  }
});

router.post("/envoyerCode/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    logger.info(courriel);
    const jetonAcces = await oAuth2Client.getAccessToken();
    console.log("Jeton d'acces : ", jetonAcces);
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "evaluationparlespairs@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refresh_token: process.env.REFRESH_TOKEN,
        accessToken: jetonAcces.token,
      },
    });

    logger.info("Transport créé");

    const codeVerification = Math.floor(1000 + Math.random() * 9000);
    const mailOptions = {
      from: "Brodeurs App",
      to: courriel,
      subject: "code de verification",
      html: `Voici votre code de verification : ${codeVerification} </h1>`,
    };
    await transport.sendMail(mailOptions);
    await client.query(
      "INSERT INTO code_verification(code,courriel) VALUES ($1,$2)",
      [codeVerification, courriel]
    );

    res.status(200).json({ message: "Courriel envoye avec succes" });
  } catch (err) {
    logger.error("Erreur lors de l'envoi du courriel : ", err);
    res.status(500).json({ message: err.message });
  }
});
router.post("/VerifierCode/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    const { code } = req.body;
    const reponse = await client.query(
      "SELECT code FROM code_verification WHERE courriel = $1 AND code = $2",
      [courriel, code]
    );
    if (reponse.rowCount === 0) {
      return res.status(404).json({ message: "Votre code a expiré!" });
    }
    return res.status(200).json({ message: "Code correspondant!" });
  } catch (err) {
    logger.error("Erreur lors de la verification du code : ", err);
    return res.status(500).json({ message: err.message });
  }
});

router.put("/CreationCompte/:courriel", async (req, res) => {
  try {
    const { courriel } = req.params;
    const { nom, prenom, nom_utilisateur, mot_de_passe, etat_utilisateur } =
      req.body;

    const salt = bcrypt.genSaltSync(10);
    const mot_de_passe_hash = await bcrypt.hash(mot_de_passe, salt);

    const updateUtilisateurResult = await client.query(
      `UPDATE utilisateur SET 
        nom = $1, 
        prenom = $2, 
        nom_utilisateur = $3,
        mot_de_passe = $4, 
        etat_utilisateur = $5
      WHERE courriel = $6
      RETURNING *`,
      [
        nom,
        prenom,
        nom_utilisateur,
        mot_de_passe_hash,
        etat_utilisateur,
        courriel,
      ]
    );

    const utilisateur = updateUtilisateurResult.rows[0];

    if (utilisateur.type_utilisateur === "P") {
      const requeteUpdateProfesseur = `
        UPDATE professeur
        SET nom_complet = $1,
            etat_professeur = $2
        WHERE id_professeur = $3
      `;
      await client.query(requeteUpdateProfesseur, [
        utilisateur.nom + " " + utilisateur.prenom,
        "Actif",
        utilisateur.professeur_id_professeur,
      ]);
    } else if (utilisateur.type_utilisateur === "E") {
      const requeteUpdateEtudiant = `
        UPDATE etudiant
        SET nom_complet = $1,
            numero_da = $2,
            etat_etudiant = $3
        WHERE id_etudiant = $4
      `;
      await client.query(requeteUpdateEtudiant, [
        utilisateur.nom + " " + utilisateur.prenom,
        "1234567", // Remplace par la vraie valeur DA si nécessaire
        "Actif",
        utilisateur.etudiant_id_etudiant,
      ]);
    }

    logger.info("Mise à jour de l'utilisateur réussie.");
    res.status(200).json({ message: "Compte mis à jour avec succès." });
  } catch (err) {
    logger.error(`Erreur lors de la mise à jour : ${err}`);
    res.status(500).json({ message: `Erreur serveur : ${err.message}` });
  }
});

router.post("/logout", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ message: "Utilisateur non connecté" });
  }
  const sessionId = req.user.id_session_utilisateur;
  await client.query(
    `UPDATE session_utilisateur 
     SET etat_session_utilisateur = 'I' 
     WHERE id_session_utilisateur = $1 
     AND etat_session_utilisateur = 'A'`,
    [sessionId]
  );
  try {
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: `${err}` });
  }
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la déconnexion" });
      }

      res.clearCookie("connect.sid"); // ou le nom de ton cookie s'il est personnalisé
      return res.status(200).json({ message: "Déconnexion réussie" });
    });
  });
});

export default router;
