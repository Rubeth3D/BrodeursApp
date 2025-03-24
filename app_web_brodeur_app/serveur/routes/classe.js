import express from "express";
import cors from "cors";
import winston, { log } from "winston";
import client from "../bd/postgresBD/connexion.js";

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

//Get toutes les classes
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("GET * FROM classe");
    res.json(resultat.rows);
    logger.info("Get des classes effectue avec succes!");
    res.status(200);
  } catch (err) {
    logger.error(`Erreur lors du get des classes ${err}`);
    res.status(500);
    res.json({
      message: "Erreur lors du fetch des classes",
    });
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
router.post("/", async (req, res) => {
  try {
    const {
      code_cours,
      description,
      groupe,
      professeur_id_professeur,
      cours_id_cours,
      etat_classe,
    } = req.body;
    const resultat = await client.query(
      "INSERT INTO classe (code_cours,description,groupe,professeur_id_professeur,cours_id_cours,etat_classe) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        code_cours,
        description,
        groupe,
        professeur_id_professeur,
        cours_id_cours,
        etat_classe,
      ]
    );
    logger.info("Insertion de la classe effectue avec succes!");
    res.status(200).json(resultat.rows[0]);
  } catch (err) {
    logger.error(`Erreur de l'insertion de la classe ${err}`);
    res.status(500);
    res.json({
      message: "Erreur de l'insertion de la classe",
    });
  }
});

//Update d'une classe
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const {
      code_cours,
      description,
      groupe,
      professeur_id_professeur,
      cours_id_cours,
      etat_classe,
    } = req.body;
    const resultat = await client.query(
      "UPDATE classe SET code_cours = $1, description = $2, groupe = $3, professeur_id_professeur = $4, cours_id_cours = $5, etat_classe = $6 WHERE id_classe = $7 RETURNING *",
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
        .json({ message: `Aucune classe ne correspond au id : ${id}!` });
    }
    logger.info("Update de la classe effectue avec succes!");
    res.status(200).json(resultat.rows[0]);
  } catch (err) {
    logger.error(`Erreur de l'update de la classe ${err}`);
    res.status(500);
    res.json({
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

export default router;
