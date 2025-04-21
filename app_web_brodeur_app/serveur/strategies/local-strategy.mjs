import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    const requete = "SELECT * FROM utilisateur WHERE nom_utilisateur = $1;";
    const parametre = [username];
    client.query(requete, parametre, function (err, result) {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (result.rows.length == 0) {
        console.log("Le nom d'utilisateur ou le mot de passe est mauvais");
        return done(null, false, {
          message: "Le nom d'utilisateur ou le mot de passe est mauvais",
        });
      }
      if (
        username == result.rows[0].nom_utilisateur &&
        password == result.rows[0].mot_passe
      ) {
        console.log("YEAAAAH!!!");

        const generateSessionId = () => {
          return Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();
        };

        const sessionId = generateSessionId();
        const utilisateur = result.rows[0];
        const utilisateurId = utilisateur.id_utilisateur;
        const dateConnexion = new Date().toISOString(); 
        const dateJetonExpiration = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        const typeUtilisateur = utilisateur.type_utilisateur;
        const etatSession = "A";

        const regarderSessionQuery = `
        SELECT * FROM session_utilisateur 
        WHERE utilisateur_id_utilisateur = $1 AND etat_session_utilisateur = 'A';
        `;
        client.query(regarderSessionQuery, [utilisateurId], function (err, sessionCheckResult) {
          if (err) {
            console.log("Erreur lors de la vérification de la session", err);
            return done(err);
          }
          if(sessionCheckResult.rows.length > 0){
            const sessionId = sessionCheckResult.rows[0].id_session_utilisateur;
            const updateSessionQuery = `
              UPDATE session_utilisateur
              SET 
                date_connexion = $1, 
                date_jeton_expiration = $2
              WHERE id_session_utilisateur = $3
              RETURNING id_session_utilisateur;
            `;
            const updateParams = [dateConnexion, dateJetonExpiration, sessionId];

            client.query(updateSessionQuery, updateParams, function (err, updatedSessionResult) {
              if (err) {
                console.log("Erreur lors de la mise à jour de la session", err);
                return done(err);
              }

              utilisateur.session_id = updatedSessionResult.rows[0].id_session_utilisateur;
              return done(null, utilisateur);  // Utilisateur et session à jour
            });
          } else {

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
          const params = [sessionId, dateConnexion, dateJetonExpiration, typeUtilisateur, utilisateurId, etatSession];
          
          client.query(insertSessionQuery,params, function (err, sessionResult){
            if(err){
              console.log("Erreur lors de l'insertion de la session", err);
              return done(err);
            }

            const sessionId = sessionResult.rows[0].id_session_utilisateur;

            utilisateur.session_id = sessionId;
            return done(null, utilisateur);
          });
          }
        });
      } else {
        console.log("BRUHHH so closes");
        return done(null, false, {
          message: "Le nom d'utilisateur ou le mot de passe est mauvais",
        });
      }
/**bcrypt.compare(password, user.password, function(err, isMatch) {
  if (err) return done(err);
  if (isMatch) {
    return done(null, user);
  } else {
    return done(null, false, { message: "Le nom d'utilisateur ou le mot de passe est mauvais" });
  }
}); */
    });
  })
);

passport.serializeUser((user, done) => {
 
  done(null, user.id_utilisateur);
});

//A refaire pour que ca regarde la session et non l'utilisateur
passport.deserializeUser((id, done) => {
  const requete = "SELECT * FROM utilisateur WHERE id_utilisateur = $1;";
  client.query(requete, [id], (err, result) => {
    if (err) return done(err);
    if (result.rows.length === 0) return done(null, false);
    return done(null, result.rows[0]);  // L'utilisateur sera disponible dans req.user
  });
});

