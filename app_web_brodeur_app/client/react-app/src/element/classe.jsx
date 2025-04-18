import React, { useState, useEffect } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";
import ModalModifierClasse from "./modalModifierClasse.jsx";
const classe = () => {
  const [classes, setClasses] = useState([]);
  const [estOuvert, setEstOuvert] = useState(false);
  //Ya des placeholders
  const [nouvelleClasse, setNouvelleClasse] = useState({
    code_cours: "",
    description: "",
    groupe: "1",
    professeur_id_professeur: "1",
    cours_id_cours: "1",
    etat_classe: "A",
  });
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const creerClasse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelleClasse),
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const supprimerClasse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/classe/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const NouvelleClasseSetData = (e) => {
    setNouvelleClasse({
      ...nouvelleClasse,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchClasses();
  }, []);
  // const  inputNouvelleClasse = e =>{
  //   console.log(e.target.value);
  // }
  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe total:</h2>
                <p className="card-text fs-4 text-primary mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe actif:</h2>
                <p className="card-text fs-4 text-success mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">0</p>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center mb-5">Tableau des classes</h1>
        <div className="container my-3">
          <div className="row">
            <div className=" col-xxl-10 col-lg-8 col-sm-6">
              <div className="d-flex m-0">
                <input
                  type="text"
                  className="form-control rounded-2"
                  placeholder="Rechercher une classe"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    fetchClasses();
                    setClasses((prevClasses) =>
                      prevClasses.filter((classe) =>
                        classe.description.toLowerCase().includes(searchTerm)
                      )
                    );
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
                  >
                    + Ajouter une classe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-hover mt-5">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Groupe</th>
              <th>Cours</th>
              <th>Professeur</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classe) => (
              <tr key={classe.id_classe}>
                <td>{classe.code_cours}</td>
                <td>{classe.description}</td>
                <td>{classe.groupe}</td>
                <td>{classe.cours_id_cours}</td>
                <td>{classe.professeur_id_professeur}</td>
                <td>{classe.etat_classe}</td>
                <td>
                  <button
                    className="btn "
                    onClick={() => {
                      setEstOuvert(true);
                    }}
                  >
                    {ModifierSVG()}
                  </button>
                  <ModalModifierClasse
                    open={estOuvert}
                    classe={classe}
                    estFermee={() => setEstOuvert()}
                    rafraichir={() => fetchClasses()}
                  ></ModalModifierClasse>
                  <button
                    className="btn "
                    onClick={() => supprimerClasse(classe.id_classe)}
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

export default classe;
