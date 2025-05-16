import React, { useState } from "react";
import MessageUtilisateur from "./MessageUtilisateur";

function CreationCompteUtilisateur({ type_utilisateur }) {
  const [codeReponseServeur, setCodeReponseServeur] = useState(null);
  const [reponseMessage, setReponseMessage] = useState(null);
  const [courriel, setCourriel] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState({
    type_utilisateur,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courriel || !typeUtilisateur) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const endpoint =
      typeUtilisateur === "professeur"
        ? "/inscription/CreationCompte/professeur"
        : "/inscription/CreationCompte/Etudiant";

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courriel, etat_utilisateur: "inactif" }),
      });

      const data = await response.json();
      if (response.ok) {
        setCodeReponseServeur(response.status);
        setReponseMessage(data.message);
        setCourriel("");
        setTypeUtilisateur("");
      } else {
        setCodeReponseServeur(response.status);
        setReponseMessage(data.message);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      alert("Erreur de communication avec le serveur.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-5">
        <MessageUtilisateur
          reponseCodeStatus={codeReponseServeur}
          reponseMessage={reponseMessage}
        ></MessageUtilisateur>
      </div>
      <h2 className="text-center mb-4">Création d’un compte utilisateur</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label className="form-label">Courriel</label>
          <input
            type="email"
            className="form-control"
            value={courriel}
            onChange={(e) => setCourriel(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Type d’utilisateur</label>
          <select
            className="form-select"
            value={typeUtilisateur}
            onChange={(e) => setTypeUtilisateur(e.target.value)}
            required
          >
            <option value="">-- Sélectionner --</option>
            {typeUtilisateur.type_utilisateur == "Admin" && (
              <option value="professeur">Professeur</option>
            )}
            <option value="etudiant">Étudiant</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Créer le compte
        </button>
      </form>
    </div>
  );
}

export default CreationCompteUtilisateur;
