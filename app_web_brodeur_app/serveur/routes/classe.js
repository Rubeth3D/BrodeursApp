import express from "express";
import cors from "cors";
import winston from "winston";
import client from "../bd/postgresBD/Connexion.js";
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

//Get toutes les classes //exemple avec vérification de l'utilisateur
router.get("/actif", verifierSessionUtilisateur, async (req, res) => {
  try {
    logger.info("Session validée, récupération des cours");
    const requeteQuery = `SELECT 
    c.code_cours,
    c.description,
    c.groupe,
    p.nom_complet AS nom_professeur,
    s.code_session,
    c.etat_classe
    FROM classe c
    JOIN cours co 
    ON c.cours_id_cours = co.id_cours 
    AND c.cours_session_id_session = co.session_id_session
    JOIN session s 
    ON co.session_id_session = s.id_session
    JOIN professeur p 
    ON c.professeur_id_professeur = p.id_professeur
    WHERE c.etat_classe = 'Actif'; `;
    const resultat = await client.query(requeteQuery);
    res.json(resultat.rows);
    logger.info("Get des classes effectue avec succes!");
    res.status(200);
  } catch (err) {
    logger.error(`Erreur lors du get des classes ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des classes" });
  }
});

//Get toutes les classes actif et Inactif
router.get("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    logger.info("Session validée, récupération des cours");
    if (req.sessionData.type_utilisateur === "A") {
      const requeteQuery = `SELECT 
      c.id_classe,
      c.code_cours,
      c.description,
      c.groupe,
      p.nom_complet AS nom_professeur,
      s.code_session,
      c.etat_classe
      FROM classe c
      JOIN cours co 
      ON c.cours_id_cours = co.id_cours 
      AND c.cours_session_id_session = co.session_id_session
      JOIN session s 
      ON co.session_id_session = s.id_session
      JOIN professeur p 
      ON c.professeur_id_professeur = p.id_professeur; `;

      const resultat = await client.query(requeteQuery);
      res.json(resultat.rows);
      logger.info("Get des classes effectue avec succes!");
      res.status(200);
    } else {
      const requeteQuery = `SELECT 
      c.id_classe,
      c.code_cours,
      c.description,
      c.groupe,
      p.nom_complet AS nom_professeur,
      c.etat_classe
      FROM classe c
      JOIN cours co 
      ON c.cours_id_cours = co.id_cours 
      AND c.cours_session_id_session = co.session_id_session
      JOIN professeur p 
      ON c.professeur_id_professeur = p.id_professeur
      WHERE c.etat_classe = 'Actif'; `;

      const resultat = await client.query(requeteQuery);
      res.json(resultat.rows);
      logger.info("Get des classes effectue avec succes!");
      res.status(200);
    }
  } catch (err) {
    logger.error(`Erreur lors du get des classes ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des classes" });
  }
});

//Get d'une classe
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "GET * FROM classe WHERE id_classe = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Aucune classe ne correspond au id : ${id}!` });
    }
    res.status(200).json(resultat.rows);
    logger.info("Get de la classe effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get de une classe `);
    res.status(500);
    res.json({
      message: "Erreur lors du fetch de votre classe",
    });
  }
});

//Insert d'une classe
router.post("/", verifierSessionUtilisateur, async (req, res) => {
  try {
    console.log("Type utilisateur: " + req.sessionData.type_utilisateur);
    if (req.sessionData.type_utilisateur === "A") {
      const {
        code_cours,
        description,
        groupe,
        professeur_id_professeur,
        etat_classe,
        cours_id_cours,
        cours_session_id_session,
      } = req.body;
      const resultat = await client.query(
        `INSERT INTO classe 
        (code_cours,description,groupe,professeur_id_professeur,
        etat_classe,cours_id_cours,cours_session_id_session) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [
          code_cours,
          description,
          groupe,
          professeur_id_professeur,
          etat_classe,
          cours_id_cours,
          cours_session_id_session,
        ]
      );
      logger.info("Insertion de la classe effectuer avec succes!");
      res.status(200).json(resultat.rows[0]);
    } else {
      console.log("id de l'utilisateur" + req.sessionData.utilisateurId);
      const querySelectProfesseur = `SELECT professeur_id_professeur from utilisateur 
      WHERE id_utilisateur = $1`;
      const resultatProfesseur = await client.query(querySelectProfesseur, [
        req.sessionData.utilisateurId,
      ]);
      const professeur_id_professeur =
        resultatProfesseur.rows[0]?.professeur_id_professeur;

      if (!professeur_id_professeur) {
        logger.error("Aucun professeur trouvé");
        return res
          .status(404)
          .json({ error: "Aucun professeur trouvé pour cet utilisateur." });
      }
      const {
        code_cours,
        description,
        groupe,
        etat_classe,
        cours_id_cours,
        cours_session_id_session,
      } = req.body;
      const resultat = await client.query(
        `INSERT INTO classe 
        (code_cours,description,groupe,professeur_id_professeur,
        etat_classe,cours_id_cours,cours_session_id_session) 
        VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [
          code_cours,
          description,
          groupe,
          professeur_id_professeur,
          etat_classe,
          cours_id_cours,
          cours_session_id_session,
        ]
      );
      logger.info("Insertion de la classe effectuer avec succes!");
      res.status(200).json(resultat.rows[0]);
    }
  } catch (err) {
    logger.error(`Erreur de l'insertion de la classe ${err}`);
    res.status(500);
    res.json({
      message: "Erreur de l'insertion de la classe",
    });
  }
});

//Update d'une classe
router.put("/ModifierClasse/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code_cours,
      description,
      groupe,
      professeur_id_professeur,
      cours_id_cours,
      etat_classe,
    } = req.body;

    const resultat = await client.query(
      `UPDATE classe 
       SET code_cours = $1, description = $2, groupe = $3, 
           professeur_id_professeur = $4, cours_id_cours = $5, 
           etat_classe = $6 
       WHERE id_classe = $7 
       RETURNING id_classe`,
      [
        code_cours,
        description,
        groupe,
        professeur_id_professeur,
        cours_id_cours,
        etat_classe,
        id,
      ]
    );

    if (resultat.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Aucune classe ne correspond à l'id : ${id} !` });
    }

    logger.info("Update de la classe effectué avec succès !");
    res.status(200).json(resultat.rows[0]);
  } catch (err) {
    logger.error(`Erreur lors de l'update de la classe : ${err}`);
    res.status(500).json({
      message: "Erreur de l'update de la classe",
    });
  }
});

//Delete d'une classe
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM classe WHERE id_classe = $1 RETURNING *",
      id
    );
    if (resultat.rowCount === 0) {
      return res
        .status(404)
        .json({ message: `Aucune classe ne correspond au id : ${id}!` });
    }
    logger.info("Supprimer la classe effectue avec succes!");
    res.status(200).json(resultat.rows[0]);
  } catch (err) {
    logger.error(`Erreur supprimer de la classe ${err}`);
    res.status(500);
    res.json({
      message: "Erreur supprimer de la classe",
    });
  }
});

router.put(
  "/desactiverClasse/:id",
  verifierSessionUtilisateur,
  async (req, res) => {
    try {
      if (req.sessionData.authentification) {
        logger.info("Session validée, Modification de la classes");
        const { id } = req.params;
        const requeteQuery = `
        UPDATE classe
        SET etat_classe = 'Inactif'
        WHERE etat_classe = 'Actif' AND id_classe = $1
        RETURNING *
      `;
        const resultat = await client.query(requeteQuery, [id]);
        res.json(resultat.rows);
        if (resultat.rows > 0) {
          logger.info("Get des classes effectue avec succes!");
          res.status(200);
        }
      } else {
        return res.status(401).json({ message: "Session Non Valide" });
      }
    } catch (err) {
      logger.error(`Erreur lors du get des classes ${err}`);
      res.status(500).json({ message: "Erreur lors du fetch des classes" });
    }
  }
);

export default router;
