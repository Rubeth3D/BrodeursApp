import express, { request, response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import classe from "../routes/classe.js";
import utilisateur from "../routes/utilisateur.js";
import inscription from "../routes/inscription.js";
import etudiant from "../routes/etudiant.js";
import sessionDeCours from "../routes/sessionCours.js";
import connexion from "../routes/connexion.js";
import passport from "passport";
import session from "express-session";
import "./../strategies/local-strategy.mjs";
import HistoriqueSession from "../routes/HistoriqueDesSessions.js";
import Commentaire from "../routes/commentaire.js";

const app = express();

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

app.use(
  session({
    secret: "BrodeurApps",
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cours", cours);
app.use("/utilisateur", utilisateur);
app.use("/sessionCours", sessionDeCours);
app.use("/classe", classe);
app.use("/etudiant", etudiant);
app.use("/historiqueDesSessions", HistoriqueSession);
app.use("/commentaire", Commentaire);
app.use("/connexion", connexion);
app.use("/inscription", inscription);

// Route de connexion
app.post("/login", (req, res, next) => {
  logger.info("Authentification de l'utilisateur");
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).send("Erreur serveur");
    if (!user)
      return res
        .status(401)
        .send(info.message || "Nom d’utilisateur ou mot de passe incorrect");

    req.login(user, (err) => {
      if (err) {
        logger.error(err);
        return res.status(500).send("Erreur lors de la création de la session");
      }

      res.json({ message: "Connexion réussie", user: user.nom_utilisateur });
      logger.info("Connexion réussie");
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
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

app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
