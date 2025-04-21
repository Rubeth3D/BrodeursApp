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
const { v4: uuidv4 } = require('uuid');

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

// Route de connexion
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).send('Erreur serveur');
    if (!user) return res.status(401).send(info.message || 'Nom d’utilisateur ou mot de passe incorrect');

    req.login(user, (err) => {
      if (err) return res.status(500).send('Erreur lors de la création de la session');

      // Ajouter l'ID de session au cookie
      res.cookie('session_id', user.session_id, {
        //httpOnly: true,
        maxAge: 1000 * 60 * 60, // 1 heure
      });

      res.json({ message: 'Connexion réussie', user: user });
    });
  })(req, res, next);
});

app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
