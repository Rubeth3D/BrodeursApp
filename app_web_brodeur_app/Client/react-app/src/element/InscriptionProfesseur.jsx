import React, { useEffect, useState, useMemo } from "react";

function InscriptionProfesseur() {
  const [professeurs, setProfesseurs] = useState([]);
  const [requete, setRequete] = useState("");
  const [compteurTotal, setCompteurTotal] = useState(0);

  const fetchProfesseurs = async () => {
    try {
      const response = await fetch("http://localhost:8080/professeur", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setProfesseurs(data);
        setCompteurTotal(data.length);
      } else {
        console.error("Erreur de récupération :", data.message);
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
    }
  };

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const professeursFiltres = useMemo(() => {
    if (!requete) return professeurs;
    return professeurs.filter((prof) =>
      prof.nom_complet.toLowerCase().includes(requete.toLowerCase())
    );
  }, [requete, professeurs]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">Liste des professeurs</h1>
      <div className="row mb-4 justify-content-center">
        <div className=" col-xxl-10 col-lg-8 col-sm-6">
          <div className="d-flex m-0">
            <input
              type="text"
              className="form-control rounded-2"
              placeholder="Rechercher un professeur par son nom..."
              onChange={(e) => {
                setRequete(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-xxl-2 col-lg-4">
          <div className="d-flex m-0">
            <div className="d-flex m-0">
              <button
                type="button"
                className="btn btn-btn btn-outline-success btn-rounded" // source : https://mdbootstrap.com/docs/standard/components/buttons/
                data-bs-toggle="modal"
                data-bs-target="#createClassModal"
                onClick={() => {
                  setModalCreerClasseEstOuvert(true);
                }}
              >
                + Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <table className="table text-center">
        <thead className="table">
          <tr>
            <th>Nom Complet</th>
            <th>Courriel</th>
            <th>ID utilisateur</th>
            <th>ID professeur</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professeursFiltres.map((prof) => (
            <tr key={prof.id_professeur}>
              <td>{prof.nom_complet?.trim() ? prof.nom_complet : "Inconnu"}</td>
              <td>professeur@gmail</td>
              <td>{prof.utilisateur_id_utilisateur}</td>
              <td>{prof.id_professeur}</td>
              <td>{prof.etat_professeur}</td>
              <td>Actions</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InscriptionProfesseur;
