import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
//work in progress
async function initialize(passport, getUtilisateurParNom, getUtilisateurParId) {
  const authentifierUtilisateur = async (nom_utilisateur, mot_passe, done) => {
    try {
      const resultat_nom = await getUtilisateurParNom(nom_utilisateur);
      const utilisateur = resultat_nom.rows[0];
      if (utilisateur == null) {
        return done(null, false, {
          message: "Aucun utilisateur ne possede ce id",
        });
      }
      const verification = await bcrypt.compare(
        mot_passe,
        utilisateur.mot_passe
      );
      if (!verification) {
        return done(null, false, { message: "Mauvais mot de passe" });
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
    done(null, utilisateur.id_utilisateur);
  });
  passport.deserializeUser(async (id_utilisateur, done) => {
    try {
      const resultat = await getUtilisateurParId(id_utilisateur);
      const utilisateur = resultat.rows[0];
      if (!utilisateur) {
        return done(null, false, {
          message: "Utilisateur introuvable",
        });
      }
      done(null, utilisateur);
    } catch (error) {
      return done(null, false, {
        message: "Aucun utilisateur ne possede ce id",
      });
    }
  });
}
export default initialize;
