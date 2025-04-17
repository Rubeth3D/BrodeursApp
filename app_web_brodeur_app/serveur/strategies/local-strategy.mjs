import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import client from "../bd/postgresBD/Connexion.js";

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
        return done(null, result);
      } else {
        console.log("BRUHHH so closes");
        return done(null, false, {
          message: "Le nom d'utilisateur ou le mot de passe est mauvais",
        });
      }
      /**const bcrypt = require('bcrypt');
bcrypt.compare(password, user.password, function(err, isMatch) {
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
