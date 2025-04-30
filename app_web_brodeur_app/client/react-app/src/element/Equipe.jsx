import React, { useState, useEffect } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";

const Equipe = () => {
  const [equipes, setEquipes] = useState([]);
  const [filtreToutesEquipes, setFiltreToutesEquipes] = useState([]);
  const [form, setForm] = useState({
    code_equipe: "",
    nom: "",
    classe_id_classe: "",
    etat_equipe: "Actif",  // Valeur par défaut
    id_cours: "",
    id_session: "",
  });

  const fetchEquipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/equipe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setEquipes(data);
      setFiltreToutesEquipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const creerEquipe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchEquipes();
        viderFormulaire();
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'équipe :", error);
    }
  };

  const modifierEquipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/equipe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchEquipes();
        viderFormulaire();
        modal.hide();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const desactiverEquipe = async (equipe) => {
    try {
      await fetch(`http://localhost:8080/equipe/${equipe.id_equipe}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...equipe,
          etat_equipe: "Inactif",
        }),
      });

      fetchEquipes();
    } catch (error) {
      console.error("Erreur de désactivation :", error);
    }
  };

  const viderFormulaire = () => {
    setForm({
      code_equipe: "",
      nom: "",
      classe_id_classe: "",
      etat_equipe: "Actif", // Reset avec valeur par défaut
      id_cours: "",
      id_session: "",
    });
  };

  useEffect(() => {
    fetchEquipes();
  }, []);

  const equipesActives = equipes.filter((equipe) => equipe.etat_equipe === "Actif").length;
  const equipesInactives = equipes.filter((equipe) => equipe.etat_equipe === "Inactif").length;
  const totalEquipes = equipes.length;

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes total:</h2>
                <p className="card-text fs-4 text-primary mt-4">{totalEquipes}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes actives:</h2>
                <p className="card-text fs-4 text-success mt-4">{equipesActives}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes inactives:</h2>
                <p className="card-text fs-4 text-danger mt-4">{equipesInactives}</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center mb-5">Liste des équipes</h1>
        <div className="container my-4">
          <div className="row">
            <div className="col-10">
              <div className="d-flex m-0">
                <input
                  type="text"
                  className="form-control rounded-2"
                  placeholder="Rechercher une équipe"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    if (searchTerm === "") {
                      setEquipes(filtreToutesEquipes);
                    } else {
                      setEquipes(
                        filtreToutesEquipes.filter((equipe) =>
                          equipe.nom.toLowerCase().includes(searchTerm)
                        )
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-2">
              <div className="d-flex m-0">
                <button
                  type="button"
                  className="btn btn-outline-success btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#creerEquipe"
                >
                  + Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover mt-5">
          <thead>
            <tr>
              <th>Code de l'équipe</th>
              <th>Nom de l'équipe</th>
              <th>Classe</th>
              <th>Etat</th>
              <th>Cours</th>
              <th>Session</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {equipes
              .filter((equipe) => equipe.etat_equipe === "Actif")
              .map((equipe) => (
                <tr key={equipe.id_equipe}>
                  <td>{equipe.code_equipe}</td>
                  <td>{equipe.nom}</td>
                  <td>{equipe.classe_id_classe}</td>
                  <td>{equipe.etat_equipe}</td>
                  <td>{equipe.id_cours}</td>
                  <td>{equipe.id_session}</td>
                  <td>
                    <button
                      className="btn btn-sn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#modifierEquipe"
                      onClick={() => setForm(equipe)}
                    >
                      {ModifierSVG()}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sn ms-2"
                      onClick={() => desactiverEquipe(equipe)}
                    >
                      {SupprimerSVG()}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Equipe;
