import express, { request, response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import winston from "winston";
import cours from "../routes/cours.js";
import classe from "../routes/classe.js";
import utilisateur from "../routes/utilisateur.js";
import etudiant from "../routes/etudiant.js";
import sessionDeCours from "../routes/sessionCours.js";
import connexion from "../routes/connexion.js";
import passport from "passport";
import session from "express-session";
import "./../strategies/local-strategy.mjs";
import HistoriqueSession from "../routes/HistoriqueDesSessions.js";
import Commentaire from "../routes/commentaire.js";
import equipe from "../routes/equipe.js";
import etudiantEquipe from "../routes/etudiantEquipe.js"

const app = express();

import { Strategy as LocalStrategy } from "passport-local";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from "bcrypt";

async function generateUniqueSessionId(client) {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000);
    const result = await client.query(
      "SELECT 1 FROM session_utilisateur WHERE id_session_utilisateur = $1",
      [id]
    );

    exists = result.rowCount > 0;
  }

  return id;
}

passport.use(
  new LocalStrategy(
    {
      usernameField: "nom_utilisateur",
      passwordField: "mot_de_passe_Utilisateur",
    },
    async (nom_utilisateur, mot_de_passe_Utilisateur, done) => {
      const requete =
        "SELECT * FROM utilisateur WHERE nom_utilisateur = $1 AND etat_utilisateur = 'Actif'";
      const parametre = [nom_utilisateur];

      try {
        console.log(nom_utilisateur);
        console.log(mot_de_passe_Utilisateur);
        const result = await client.query(requete, parametre);

        if (result.rows.length === 0) {
          console.log("Le nom d'utilisateur ou le mot de passe est mauvais");
          return done(null, false, {
            message: "Le nom d'utilisateur ou le mot de passe est mauvais",
          });
        }
        const utilisateur = result.rows[0];
        console.log(utilisateur);

        const mot_de_passe_trim = mot_de_passe_Utilisateur.trim();
        const mot_de_passe_hash_trim = utilisateur.mot_de_passe.trim();
        const mot_de_passe_Verifier = await bcrypt.compare(
          mot_de_passe_trim,
          mot_de_passe_hash_trim
        );

        console.log(`Le mot de passe est valide  : ${mot_de_passe_Verifier}`);

        if (mot_de_passe_Verifier) {
          console.log("Mot de passe et Nom d'utilisateur Valide");

          const sessionId = await generateUniqueSessionId(client);

          const utilisateurId = utilisateur.id_utilisateur;
          const dateConnexion = new Date().toISOString();
          const dateJetonExpiration = new Date(
            Date.now() + 60 * 60 * 1000
          ).toISOString();
          const typeUtilisateur = utilisateur.type_utilisateur;
          const etatSession = "A";

          const regarderSessionQuery = `
          SELECT * FROM session_utilisateur 
          WHERE utilisateur_id_utilisateur = $1 AND etat_session_utilisateur = 'A';
        `;

          const sessionCheckResult = await client.query(regarderSessionQuery, [
            utilisateurId,
          ]);

          if (sessionCheckResult.rows.length > 0) {
            console.log("Session Active trouver");
            const sessionId = sessionCheckResult.rows[0].id_session_utilisateur;

            const updateSessionQuery = `
            UPDATE session_utilisateur
            SET 
              date_connexion = $1, 
              date_jeton_expiration = $2
            WHERE id_session_utilisateur = $3
            RETURNING id_session_utilisateur;
          `;

            const updateParams = [
              dateConnexion,
              dateJetonExpiration,
              sessionId,
            ];

            const updatedSessionResult = await client.query(
              updateSessionQuery,
              updateParams
            );
            console.log("Update de la session");

            utilisateur.session_id =
              updatedSessionResult.rows[0].id_session_utilisateur;
            return done(null, utilisateur);
          } else {
            console.log("Aucune session existante ou active");

            const insertSessionQuery = `
            INSERT INTO session_utilisateur (
              id_session_utilisateur,
              date_connexion,
              date_jeton_expiration,
              type_utilisateur,
              utilisateur_id_utilisateur,
              etat_session_utilisateur
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_session_utilisateur;
          `;

            const params = [
              sessionId,
              dateConnexion,
              dateJetonExpiration,
              typeUtilisateur,
              utilisateurId,
              etatSession,
            ];

            const sessionResult = await client.query(
              insertSessionQuery,
              params
            );
            const newSessionId = sessionResult.rows[0].id_session_utilisateur;

            utilisateur.session_id = newSessionId;
            return done(null, utilisateur);
          }
        } else {
          console.log("BRUHHH so close");
          return done(null, false, {
            message: "Le nom d'utilisateur ou le mot de passe est mauvais",
          });
        }
      } catch (err) {
        console.error("Erreur lors de la requête :", err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((utilisateur, done) => {
  console.log("Serialize User avec session_id:", utilisateur.session_id);
  done(null, utilisateur.session_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const requete =
      "SELECT * FROM session_utilisateur WHERE id_session_utilisateur = $1;";
    const result = await client.query(requete, [id]);

    if (result.rows.length === 0) {
      return done(null, false);
    }
    return done(null, result.rows[0]);
  } catch (err) {
    return done(err);
  }
});

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
app.use("/equipe", equipe);
app.use("/etudiantEquipe",etudiantEquipe);

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
      if (err)
        return res.status(500).send("Erreur lors de la création de la session");

      res.json({ message: "Connexion réussie", user: user.nom_utilisateur });
      logger.info("Connexion réussie");
    });
  })(req, res, next);
});

app.listen(8080, () => {
  logger.info("Le serveur roule sur le port 8080");
});
