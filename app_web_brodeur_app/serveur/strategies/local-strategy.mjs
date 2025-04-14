import passport from "passport";
import { Strategy } from "passport-local";

export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    try {
      const findUser = fetch(`http://localhost:8080/utilisateur/${username}`);
      if (!findUser) {
        throw new Error("user pas trouver");
      }
      if (findUser.password != password) {
        throw new Error("mot de passe invalide");
      }
      done(null, findUser);
    } catch (error) {
      console.error(error);
      done(err, null);
    }
  })
);
