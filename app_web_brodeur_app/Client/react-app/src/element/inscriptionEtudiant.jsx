import React, { useEffect, useState, useMemo } from "react";

function InscriptionEtudiant() {
  const [etudiants, setEtudiants] = useState([]);
  const [requete, setRequete] = useState("");
  const [compteurTotal, setCompteurTotal] = useState(0);

  const fetchEtudiants = async () => {
    try {
      const response = await fetch("http://localhost:8080/etudiant", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setEtudiants(data);
        setCompteurTotal(data.length);
      } else {
        console.error("Erreur de récupération :", data.message);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const etudiantsFiltres = useMemo(() => {
    if (!requete) return etudiants;
    return etudiants.filter((etu) =>
      (etu.nom_complet || "Inconnu")
        .toLowerCase()
        .includes(requete.toLowerCase())
    );
  }, [requete, etudiants]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">Liste des étudiants</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col-xxl-10 col-lg-8 col-sm-6">
          <div className="d-flex m-0">
            <input
              type="text"
              className="form-control rounded-2"
              placeholder="Rechercher un étudiant par son nom..."
              onChange={(e) => {
                setRequete(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-xxl-2 col-lg-4">
          <div className="d-flex m-0">
            <button
              type="button"
              className="btn btn-outline-success btn-rounded"
              // Tu peux activer cette modale plus tard si tu ajoutes une fonctionnalité d'ajout
              // onClick={() => setModalCreerEtudiantEstOuvert(true)}
            >
              + Ajouter
            </button>
          </div>
        </div>
      </div>

      <table className="table text-center">
        <thead className="table">
          <tr>
            <th>Nom Complet</th>
            <th>Courriel</th>
            <th>numero Da</th>
            <th>ID utilisateur</th>
            <th>ID étudiant</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          {etudiantsFiltres.map((etu) => (
            <tr key={etu.id_etudiant}>
              <td>{etu.nom_complet?.trim() ? etu.nom_complet : "Inconnu"}</td>
              <td>{etu.courriel || "Inconnu"}</td>
              <td>222222</td>
              <td>{etu.utilisateur_id_utilisateur}</td>
              <td>{etu.id_etudiant}</td>
              <td>{etu.etat_etudiant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InscriptionEtudiant;
