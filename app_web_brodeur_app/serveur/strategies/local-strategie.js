import { passport, Strategy } from "passport";
import bcrypt from "bcrypt";
//work in progress
async function initialize(passport) {
  passport.use(
    new Strategy(async (id_session_utilisateur, password, done) => {
      if (id_session_utilisateur == null) {
        return done(null, false, {
          message: "Aucun utilisateur ne possede ce id de session",
        });
      }
      try {
        const verification = await bcrypt.compare(passport, placeholder);
        if (!verification) {
          return done(null, false, { message: "Mauvais mot de passe" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
}
