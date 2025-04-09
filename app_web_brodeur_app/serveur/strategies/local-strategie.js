import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import winston from "winston";
import { json } from "express";

//work in progress
const initialize = async (
  passport,
  getUtilisateurParNom,
  getUtilisateurParId,
  bb = 1
) => {
  if (bb == 1) {
    return;
  }
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
  const authentifierUtilisateur = async (nom_utilisateur, mot_passe, done) => {
    try {
      console.log("Strategie appelle");
      const resultat_nom = await getUtilisateurParNom(nom_utilisateur);
      const utilisateur = resultat_nom.rows[0];
      if (utilisateur == null) {
        return done(null, false, {
          message: "Aucun utilisateur ne possede ce id",
        });
      }
      const verifierMotDePasse = bcrypt.compare(
        resultat_nom.mot_passe,
        mot_passe
      );
      if (verifierMotDePasse) {
        logger.log("Mauvais mot de passe");
        return done(null, false, {
          message: "Mauvais mot de passe",
        });
      }
      return done(null, utilisateur);
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new LocalStrategy(
      { usernameField: "nom_utilisateur" },
      authentifierUtilisateur
    )
  );
  passport.serializeUser((utilisateur, done) => {
    console.log("Serialize l'utilisateur");
    done(null, utilisateur.id_utilisateur);
  });
  passport.deserializeUser(async (id_utilisateur, done) => {
    try {
      console.log("Deserialize l'utilisateur");
      console.log(getUtilisateurParId);
      const resultat = await getUtilisateurParId(id_utilisateur);
      console.log(resultat);
      const utilisateur = resultat.rows[0];
      const utilisateurString = JSON.stringify(utilisateur);
      console.log(`Utilisateur deserialize : ${utilisateurString}`);
      if (!utilisateur) {
        return done(null, false, {
          message: "Utilisateur introuvable",
        });
      }
      const utilisateur_filtre = {
        id_utilisateur: utilisateur.id_utilisateur,
        nom_utilisateur: utilisateur.nom_utilisateur,
        courriel: utilisateur.courriel,
        numero_da: utilisateur.numero_da,
      };
      done(null, utilisateur_filtre);
    } catch (err) {
      logger.error(`Erreur lors du deserialize : ${err}`);
      return done(null, false, {
        message: "Aucun utilisateur ne possede ce id",
      });
    }
  });
};
export default initialize;
