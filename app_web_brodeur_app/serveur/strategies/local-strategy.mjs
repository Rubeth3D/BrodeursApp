import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import client from "../bd/postgresBD/Connexion.js";
import bcrypt from 'bcrypt';

export default passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    const requete = "SELECT * FROM utilisateur WHERE nom_utilisateur = $1;";
    const parametre = [username];
    client.query(requete, parametre, function (err, result) {
      //console.log(result.rows[0]);
      //console.log(result.rows[0].nom_utilisateur);
      //console.log(result.rows[0].mot_passe);
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
        const utilisateur = result.rows[0];
        const utilisateurId = utilisateur.id_utilisateur;
        const dateConnexion = new Date();
        const dateJetonExpiration = new Date(dateConnexion.getTime() + (60 * 60 * 1000)); 
        const typeUtilisateur = utilisateur.type_utilisateur;
        const etatSession = "A";

        const insertSessionQuery = `
            INSERT INTO session_utilisateur (
              date_connexion,
              date_jeton_expiration,
              type_utilisateur,
              utilisateur_id_utilisateur,
              etat_session_utilisateur
            ) VALUES ($1, $2, $3, $4, $5) RETURNING id_session_utilisateur;
          `;
          const params = [dateConnexion, dateJetonExpiration, typeUtilisateur, utilisateurId, etatSession];
          
          client.query(insertSessionQuery,params, function (err, sessionResult){
            if(err){
              console.log("Erreur lors de l'insertion de la session", err);
              return done(err);
            }

            const sessionId = sessionResult.rows[0].id_session_utilisateur;

            utilisateur.session_id = sessionId;
            return done(null, utilisateur);
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

passport.deserializeUser((id, done) => {
  const requete = "SELECT * FROM utilisateur WHERE id_utilisateur = $1;";
  client.query(requete, [id], (err, result) => {
    if (err) return done(err);
    if (result.rows.length === 0) return done(null, false);
    return done(null, result.rows[0]);  // L'utilisateur sera disponible dans req.user
  });
});
