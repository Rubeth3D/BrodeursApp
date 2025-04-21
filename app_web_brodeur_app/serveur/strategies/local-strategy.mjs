import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import client from "../bd/postgresBD/Connexion.js";

// Fonction pour générer un ID de session unique
async function generateUniqueSessionId(client) {
  let id;
  let exists = true;

  while (exists) {
    id = Math.floor(100000 + Math.random() * 900000);  // Génère un nombre aléatoire à 6 chiffres
    const result = await client.query(
      'SELECT 1 FROM session_utilisateur WHERE id_session_utilisateur = $1',
      [id]
    );  // Attente de la réponse de la base de données pour vérifier l'existence de l'ID

    exists = result.rowCount > 0;  // Si un résultat est trouvé, cela signifie que l'ID existe déjà
  }

  return id;  // Retourne l'ID unique
}

export default passport.use(
  new LocalStrategy(async (username, password, done) => {  // La fonction de la stratégie doit être 'async'
    const requete = "SELECT * FROM utilisateur WHERE nom_utilisateur = $1;";
    const parametre = [username];

    try {
      // Attendre la réponse de la base de données pour récupérer l'utilisateur
      const result = await client.query(requete, parametre);

      if (result.rows.length === 0) {
        console.log("Le nom d'utilisateur ou le mot de passe est mauvais");
        return done(null, false, {
          message: "Le nom d'utilisateur ou le mot de passe est mauvais",
        });
      }

      const utilisateur = result.rows[0];  // L'utilisateur récupéré depuis la base de données

      // Vérification du mot de passe
      if (username === utilisateur.nom_utilisateur && password === utilisateur.mot_passe) {
        console.log("Mot de passe et Nom d'utilisateur Valide");

        // Appel de la fonction pour générer un ID de session unique
        const sessionId = await generateUniqueSessionId(client);  // Utilisation de await pour attendre le résultat de cette fonction

        const utilisateurId = utilisateur.id_utilisateur;
        const dateConnexion = new Date().toISOString(); 
        const dateJetonExpiration = new Date(Date.now() + 60 * 60 * 1000).toISOString();
        const typeUtilisateur = utilisateur.type_utilisateur;
        const etatSession = "A";

        // Vérification des sessions existantes dans la base de données
        const regarderSessionQuery = `
          SELECT * FROM session_utilisateur 
          WHERE utilisateur_id_utilisateur = $1 AND etat_session_utilisateur = 'A';
        `;

        const sessionCheckResult = await client.query(regarderSessionQuery, [utilisateurId]);  // Attente de la réponse de la base de données

        if (sessionCheckResult.rows.length > 0) {
          console.log("Aucune session existante ou active");
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

          const updatedSessionResult = await client.query(updateSessionQuery, updateParams);  // Attente de la mise à jour dans la base de données
          console.log("Update de la session");

          utilisateur.session_id = updatedSessionResult.rows[0].id_session_utilisateur;
          return done(null, utilisateur);  // Utilisateur et session à jour
        } else {
          console.log("Création de la session");

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

          const sessionResult = await client.query(insertSessionQuery, params);  // Attente de l'insertion dans la base de données
          const newSessionId = sessionResult.rows[0].id_session_utilisateur;

          utilisateur.session_id = newSessionId;
          return done(null, utilisateur);  // Session nouvellement créée
        }
      } else {
        console.log("BRUHHH so close");
        return done(null, false, {
          message: "Le nom d'utilisateur ou le mot de passe est mauvais",
        });
      }
    } catch (err) {
      console.error("Erreur lors de la requête :", err);  // Gestion des erreurs globales
      return done(err);  // Retourne l'erreur au gestionnaire de passport
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id_utilisateur);  // Sérialisation de l'utilisateur
});

// Désérialisation de l'utilisateur à partir de la session
passport.deserializeUser((id, done) => {
  const requete = "SELECT * FROM utilisateur WHERE id_utilisateur = $1;";

  client.query(requete, [id], async (err, result) => {
    if (err) return done(err);
    if (result.rows.length === 0) return done(null, false);
    return done(null, result.rows[0]);  // L'utilisateur sera disponible dans req.user
  });
});
