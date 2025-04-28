/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = "mongoBrodeurApps";
const collectionCommentaire = "Commentaire";
const collectionSession = "Historique_Des_Sessions";

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collectionCommentaire);
db.createCollection(collectionSession);

const commentaire = [
  {
    id_utilisateur: "1",
    nom_utilisateur: "Jean Dupuis",
    type_utilisateur: "Professeur",
    commentaire: "Je voudrais que des animations soit ajouter sur le site web",
  },
  {
    id_utilisateur: "2",
    nom_utilisateur: "Monique Guillaume",
    type_utilisateur: "Professeur",
    commentaire:
      "interface du site est vraiment intuitive et agréable à utiliser. Bravo pour le design épuré !",
  },
  {
    id_utilisateur: "3",
    nom_utilisateur: "Christian Muller",
    type_utilisateur: "Professeur",
    commentaire:
      "Le site est super, mais il serait encore mieux si une fonction de recherche était ajoutée pour trouver plus facilement les informations.",
  },
  {
    id_utilisateur: "4",
    nom_utilisateur: "Michele Fournier",
    type_utilisateur: "Professeur",
    commentaire:
      "Le site se charge très rapidement, ce qui est un gros plus. Cela rend la navigation beaucoup plus agréable.",
  },
  {
    id_utilisateur: "5",
    nom_utilisateur: "Denis Dupuis",
    type_utilisateur: "Professeur",
    commentaire:
      "Le site est bien optimisé pour les appareils mobiles, et ça rend lexpérience utilisateur encore meilleure. Très bien joué !",
  },
  {
    id_utilisateur: "6",
    nom_utilisateur: "Marion Boucher",
    type_utilisateur: "Professeur",
    commentaire:
      "Les articles sont très intéressants et bien écrits. Jai appris beaucoup de choses en visitant votre site, continuez ainsi !",
  },
  {
    id_utilisateur: "6",
    nom_utilisateur: "Gerard Tanguy",
    type_utilisateur: "Professeur",
    commentaire:
      "Lajout de la fonctionnalité de chat en ligne est vraiment un excellent ajout. Cela permet de répondre rapidement à mes questions.",
  },
];

const HistoriqueSession = [
  {
    id_utilisateur: "1",
    id_session: "2jjf29jg203ui9g92u923u53",
    numeroDa: "",
    nom_utilisateur: "Jean Dupuis",
    courriel: "jean.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Cours",
    type_action: "Delete",
    description_action: "Supprimer un cours",
    date_action: "2025-05-01 10:00:00+00",
  },
  {
    id_utilisateur: "1",
    id_session: "2jjf29jg203ui9g92u923u53",
    numeroDa: "",
    nom_utilisateur: "Jean Dupuis",
    courriel: "jean.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Equipe",
    type_action: "Get",
    description_action: "Fetch equipe",
    date_action: "2025-05-01 10:00:00+00",
  },
  {
    id_utilisateur: "5",
    id_session: "g93g029i301tg2ij4024g",
    numeroDa: "",
    nom_utilisateur: "Denis Dupuis",
    courriel: "denis.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Connexion",
    type_action: "Connexion",
    description_action: "Connexion au site web",
    date_action: "2025-05-01 10:00:00+05",
  },
  {
    id_utilisateur: "5",
    id_session: "g93g029i301tg2ij4024g",
    numeroDa: "",
    nom_utilisateur: "Denis Dupuis",
    courriel: "denis.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Classe",
    type_action: "Put",
    description_action: "Modifier classe",
    date_action: "2025-05-01 10:00:00+07",
  },
  {
    id_utilisateur: "5",
    id_session: "g93g029i301tg2ij4024g",
    numeroDa: "",
    nom_utilisateur: "Denis Dupuis",
    courriel: "denis.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Classe",
    type_action: "Post",
    description_action: "Ajouter Classe",
    date_action: "2025-05-01 10:00:00+09",
  },
  {
    id_utilisateur: "5",
    id_session: "g93g029i301tg2ij4024g",
    numeroDa: "",
    nom_utilisateur: "Denis Dupuis",
    courriel: "denis.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Equipe",
    type_action: "Deconnexion",
    description_action: "Deconnexion Manuelle au site web",
    date_action: "2025-05-01 40:00:0+00",
  },
  {
    id_utilisateur: "5",
    id_session: "g93g029i301tg2ij4024g",
    numeroDa: "",
    nom_utilisateur: "Denis Dupuis",
    courriel: "denis.dupuis@gmail.com",
    type_utilisateur: "Professeur",
    page: "Equipe",
    type_action: "Deconnexion",
    description_action: "Session expirer",
    date_action: "2025-05-01 40:00:0+00",
  },
];

db.Commentaire.insertMany(commentaire);

db.Historique_Des_Sessions.insertMany(HistoriqueSession);
