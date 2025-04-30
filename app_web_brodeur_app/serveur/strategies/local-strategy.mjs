import passport from "passport";
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

export default passport.use(
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
