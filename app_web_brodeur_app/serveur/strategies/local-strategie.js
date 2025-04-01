import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
//work in progress
async function initialize(passport, getUtilisateurParId) {
  const authentifierUtilisateur = async (id_utilisateur, password, done) => {
    const utilisateur = await getUtilisateurParId(id_utilisateur);
    if (utilisateur == null) {
      return done(null, false, {
        message: "Aucun utilisateur ne possede ce id",
      });
    }
    try {
      const verification = await bcrypt.compare(password, utilisateur.password);
      if (!verification) {
        return done(null, false, { message: "Mauvais mot de passe" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "nom_user" }, authentifierUtilisateur)
  );
  passport.serializeUser((user, done) => {
    done(null, utilisateur.id_utilisateur);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const utilisateur = await getUtilisateurParId(utilisateur.id_utilisateur);
      done(null, utilisateur);
    } catch (error) {
      return done(null, false, {
        message: "Aucun utilisateur ne possede ce id",
      });
    }
  });
}
export default initialize;
