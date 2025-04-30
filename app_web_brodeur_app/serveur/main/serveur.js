import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import utilisateur from "../routes/utilisateur.js";
import session from "../routes/sessionCours.js";
import logSessions from "../routes/logSessions.js";
import passport from "passport";
import sessionExpress from "express-session";
import { config } from "dotenv";
import initialize from "../strategies/local-strategie.js";
import client from "../bd/postgresBD/Connexion.js";
import classe from "../routes/classe.js";
import equipe from "../routes/equipe.js";

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
app.use("/logSessions", logSessions);
app.use("/classe", classe);
app.use("/equipe", equipe);
app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
