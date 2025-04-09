import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

const Cours = () => {
  const [cours, setCours] = useState([]);
  const [form, setForm] = useState({
    code_cours: "",
    description_cours: "",
    etat_cours: "",
    session_id_session: "",
  });

  const fetchCours = async () => {
    try {
      const response = await fetch("http://localhost:8080/cours", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCours(data);
    } catch (error) {
      console.error(error);
    }
  };

  const creerCours = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/cours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchCours();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const modifierCours = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchCours();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const supprimerCours = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/cours/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        fetchCours();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCours();
  }, []);

  const constCoursActif = cours.filter((cours) => cours.etat_cours === "actif");
  const constCoursInactif = cours.filter(
    (cours) => cours.etat_cours === "inactif"
  );

  return (
    <>
      {/* Inspirer par Jean-François Brodeur */}
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours total:</h2>
                <p className="card-text fs-4 text-primary mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours actif:</h2>
                <p className="card-text fs-4 text-success mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">0</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center mb-5">Liste des cours</h1>
        <div className="container my-3">
          <div className="row">
            <div className="col-10">
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
            <div className="col-2">
              <div className="d-flex m-0">
                <button
                  type="button"
                  className="btn btn-btn btn-outline-success btn-rounded" // source : https://mdbootstrap.com/docs/standard/components/buttons/
                  data-bs-toggle="modal"
                  data-bs-target="#createClassModal"
                >
                  + Ajouter un cours
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover mt-5">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Etat</th>
              <th>Session</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cours.map((cours) => (
              <tr key={cours.id_cours}>
                <td>{cours.code_cours}</td>
                <td>{cours.description_cours}</td>
                <td>{cours.etat_cours}</td>
                <td>{cours.session_id_session}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#modifierCours"
                    onClick={() => setForm(cours)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => supprimerCours(cours.id_cours)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="creerCours"
        tabIndex="-1"
        aria-labelledby="creerCoursLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="creerCoursLabel">
                Ajouter un cours
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form onSubmit={creerCours}>
                {[
                  { label: "Code cours", id: "code_cours" },
                  { label: "Nom cours", id: "description_cours" },
                  { label: "Etat Classe", id: "etat_classe" },
                  { label: "Session", id: "session_id_session" },
                ].map(({ label, id }) => (
                  <div className="mb-3" key={id}>
                    <label htmlFor={id} className="form-label">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={id}
                      value={form[id]}
                      onChange={(e) =>
                        setForm({ ...form, [id]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cours;
