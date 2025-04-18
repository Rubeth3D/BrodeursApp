import express, { request, response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import utilisateur from "../routes/utilisateur.js";
import sessionDeCours from "../routes/session.js";
import logSessions from "../routes/logSessions.js";
import passport from "passport";
import session from "express-session";
import "./../strategies/local-strategy.mjs";

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
      maxAge: 1000 * 60 * 24,
    },
  })
);
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/cours", cours);
app.use("/utilisateur", utilisateur);
app.use("/session", sessionDeCours);
app.use("/logSessions", logSessions);
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/auth", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.error("Erreur serveur :", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    if (!user) {
      return res.status(401).json({ message: info?.message || "Authentification échouée" });
    }

    // Si authentification réussie, on retourne les infos utiles
    return res.status(200).json({
      nom_user: user.nom_utilisateur,
      session_id: user.session_id,
      type_utilisateur: user.type_utilisateur,
    });
  })(req, res, next); // Ne pas oublier d'appeler avec req, res, next
});

app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
