import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import utilisateur from "../routes/utilisateur.js";
import session from "../routes/sessionCours.js";
import logSessions from "../routes/logSessions.js";
import authentification from "../routes/authentification.js";
import passport from "passport";
import sessionExpress from "express-session";
import { config } from "dotenv";
import initialize from "../strategies/local-strategie.js";
import client from "../bd/postgresBD/Connexion.js";

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
app.use(
  sessionExpress({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
//initialisation du passport
initialize(
  passport,
  async (nom_utilisateur) => {
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE nom_utilisateur = $1",
      [nom_utilisateur]
    );
    return resultat;
  },
  async (id_utilisateur) => {
    console.log("Recherche de l'utilisateur du deserialize...");
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE id_utilisateur = $1",
      [id_utilisateur]
    );
    return resultat;
  },
  2
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use("/cours", cours);
app.use("/utilisateur", utilisateur);
app.use("/sessionCoursS", session);
app.use("/logSessions", logSessions);
app.use("/authentification", authentification);
app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
