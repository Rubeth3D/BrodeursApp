import express, { json, query } from "express";
import cors from "cors";
import winston from "winston";
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

//get pour les etudiants
router.get("/", async (req, res) => {
  try {
    const resultat = await client.query("SELECT * FROM etudiant");
    res.status(200).json(resultat.rows);
    logger.info("Get des etudiants effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du fetch des etudiants : ${err}`);
    res.status(500).json({ message: "Erreur lors du fetch des etudiants!" });
  }
});

//get pour un etudiant
router.get("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "SELECT * FROM etudiant WHERE id_etudiant = $1",
      [id]
    );

    if (resultat.rowCount === 0) {
      logger.error(`Aucun etudiant n'a le id : ${id}`);
      return res
        .status(404)
        .json({ message: `Aucun etudiant n'a le id :${id}` });
    }

    res.status(200).json(resultat.rows);
    logger.info("Get de l'etudiant effectue avec succes!");
  } catch (err) {
    logger.error(`Erreur lors du get du etudiant : ${err}`);
    res.status(500).json({ message: "Erreur lors du get du etudiant" });
  }
});

//post pour un etudiant
router.post("/", async (req, res) => {
  try {
    const { equipeIdEquipe, idEtudiant, nomComplet, etatEtudiant } = req.body;
    const resultat = await client.query(
      "INSERT ON etudiant(equipe_id_equipe,id_etudiant,nom_complet,etat_etudiant) VALUES($1,$2,$3,$4)"[
        (equipeIdEquipe, idEtudiant, nomComplet, etatEtudiant)
      ]
    );
    res.status(200).json({ message: "Inscription fait avec succes" });
    logger.info("Insert du etudiant fait avec succes");
  } catch (err) {
    logger.error(`Erreur lors du insert ${err}`);
    res.status(500).json({ message: "Erreur lors du insert" });
  }
});

//put pour un etudiant
router.put("/:id", async (req, res) => {
  try {
    const id = req.params;
    const { equipeIdEquipe, nomComplet, etatEtudiant } = req.body;
    const resultat = await client.query(
      "UPDATE ON etudiant SET equipe_id_equipe = $1, nom_complet = $2, etat_etudiant = $3 WHERE id_etudiant = $4 RETURNING *"
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun etudiant ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun etudiant ne correspond a ce id" });
    }
    res.status(200).json({ message: "Update fait avec succes!" });
    logger.info("Update fait avec succes!");
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du update" });
    logger.error(`Erreur lors du update ${err}`);
  }
});

//delete pour un etudiant

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params;
    const resultat = await client.query(
      "DELETE FROM etudiant WHERE id = $1 RETURNING *",
      [id]
    );
    if (resultat.rows.length === 0) {
      logger.error("Aucun etudiant ne correspond a ce id");
      return res
        .status(404)
        .json({ message: "Aucun etudiant ne correspond a ce id" });
    }

    res.status(200).json({ message: "Cours retire" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du delete du cours" });
    logger.error(`Erreur lors du delete du cours ${err}`);
  }
});

export default router;
