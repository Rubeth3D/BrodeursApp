import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import utilisateur from "../routes/utilisateur.js";
import session from "../routes/sessionCours.js";
import historiqueDesSessions from "../routes/HistoriqueDesSessions.js";
import inscription from "../routes/inscription.js";
import passport from "passport";
import sessionExpress from "express-session";
import { config } from "dotenv";
import initialize from "../strategies/local-strategy.mjs";
import client from "../bd/postgresBD/Connexion.js";
import classe from "../routes/classe.js";
import equipe from "../routes/equipe.js";
import etudiant from "../routes/etudiant.js";
import etudiantEquipe from "../routes/etudiantEquipe.js";
import sessionCours from "../routes/sessionCours.js";

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
const corsConfig = {
  credentials: true,
  origin: true,
};
config();
const app = express();

app.use(express.json());

//initialisation du passport
app.use(cors(corsConfig));
app.use(cookieParser());
app.use("/cours", cours);
app.use("/utilisateur", utilisateur);
app.use("/sessionCours", session);
app.use("/logSessions", historiqueDesSessions);
app.use("/classe", classe);
app.use("/equipe", equipe);
app.use("/session", session);
app.use("/etudiant", etudiant);
app.use("/etudiantEquipe", etudiantEquipe);
app.use("/inscription", inscription);
app.use("/sessionCours", sessionCours);

// Route de connexion
app.post("/login", (req, res, next) => {
  logger.info("Authentification de l'utilisateur");
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json("Erreur serveur");
    if (!user)
      return res
        .status(401)
        .json(info.message || "Nom d’utilisateur ou mot de passe incorrect");

    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Erreur lors de la création de la session" });
      logger.info("Connexion réussie");
    });
  })(req, res, next);
});

app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
