import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import client from "../bd/postgresBD/Connexion.js";
console.log("Strategie enregistre");
passport.serializeUser((utilisateur, done) => {
  console.log("Dans serialize");
  done(null, utilisateur.id_utilisateur);
});
passport.deserializeUser(async (id_utilisateur, done) => {
  try {
    console.log("Dans deserialize");
    const resultat = await client.query(
      "SELECT * FROM utilisateur WHERE id_utilisateur = $1",
      [id_utilisateur]
    );
    const utilisateur = resultat.rows[0];
    const utilisateurFiltre = {
      id_utilisateur: utilisateur.id_utilisateur,
      nom_utilisateur: utilisateur.nom_utilisateur,
      numero_da: utilisateur.numero_da,
      courriel: utilisateur.courriel,
    };
    done(null, utilisateurFiltre);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new LocalStrategy(
    { usernameField: "nom_utilisateur" },
    async (username, password, done) => {
      console.log("Strategy appelle");
      const resultat = await client.query(
        "SELECT * FROM utilisateur WHERE nom_utilisateur = $1",
        [username]
      );
      if (resultat.rowCount === 0) {
        throw new Error("Mauvais identifiant");
      }
      const utilisateur = resultat.rows[0];
      const verificationMotDePasse = await bcrypt.compare(
        password,
        utilisateur.mot_passe
      );
      if (!verificationMotDePasse) {
        throw new Error("Mauvais identifiant");
      }
      done(null, utilisateur);
      try {
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
