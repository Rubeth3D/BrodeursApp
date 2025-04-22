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

<<<<<<< Updated upstream
  const coursActif = cours.filter((cours) => cours.etat_cours === "actif").length;
  const coursInactif = cours.filter((cours) => cours.etat_cours === "inactif").length;
=======
  const coursActif = cours.filter(
    (cours) => cours.etat_cours === "Actif"
  ).length;
  const coursInactif = cours.filter(
    (cours) => cours.etat_cours === "Inactif"
  ).length;
>>>>>>> Stashed changes
  const totalCours = cours.length;

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours total:</h2>
                <p className="card-text fs-4 text-primary mt-4">{totalCours}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours actif:</h2>
                <p className="card-text fs-4 text-success mt-4">{coursActif}</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de cours inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">{coursInactif}</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center mb-5">Liste des cours</h1>
        <div className="container my-4">
          <div className="row">
            <div className="col-10">
              <div className="d-flex m-0">
                <input
                  type="text"
                  className="form-control rounded-2"
                  placeholder="Rechercher un cours"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setCours((prevCours) =>
                      prevCours.filter((cours) =>
                        cours.description_cours.toLowerCase().includes(searchTerm)
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
                  className="btn btn-outline-success btn-rounded"
                  data-bs-toggle="modal"
                  data-bs-target="#creerCours"
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
      
      {/* Modal pour ajouter un cours */}
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

            {/* Source : https://getbootstrap.com/docs/5.0/forms/validation/ */}
            <div className="modal-body">
              <form className="row g-3 needs-validation" noValidate onSubmit={creerCours}>
                
                <div className='col-mb-4'>
                  <label htmlFor="validationCustom01" className="form-label">Code du cours</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="validationCustom01" 
                    value={form.code_cours} 
                    onChange={(e) => setForm({ ...form, code_cours: e.target.value })}
                    required
                  />
                  <div className="valid-feedback">Bien</div>
                  <div className="invalid-feedback">Code du cours requis</div>
                </div>

                <div className='col-mb-4'>
                  <label htmlFor="validationCustom02" className="form-label">Nom du cours</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="validationCustom02" 
                    value={form.description_cours} 
                    onChange={(e) => setForm({ ...form, description_cours: e.target.value })}
                    required
                  />
                  <div className="valid-feedback">Bien</div>
                  <div className="invalid-feedback">Nom du cours requis</div>
                </div>

                <div className='col-mb-4'>
                  <label htmlFor="validationCustom03" className="form-label">État du cours</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="validationCustom03" 
                    value={form.etat_cours} 
                    onChange={(e) => setForm({ ...form, etat_cours: e.target.value })}
                    required
                  />
                  <div className="valid-feedback">Bien</div>
                  <div className="invalid-feedback">État du cours requis</div>
                </div>

                <div className='col-mb-4'>
                  <label htmlFor="validationCustom04" className="form-label">Session</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="validationCustom04" 
                    value={form.session_id_session} 
                    onChange={(e) => setForm({ ...form, session_id_session: e.target.value })}
                    required
                  />
                  <div className="valid-feedback">Bien</div>
                  <div className="invalid-feedback">Session requise</div>
                </div>

                <button type="submit" className="btn btn-primary">
                  <span className="visually-hidden">Ajouter un cours</span>
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


      {/* Modal pour modifier un cours */}
    <div
      className="modal fade"
      id="modifierCours"
      tabIndex="-1"
      aria-labelledby="modifierCoursLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modifierCoursLabel">
              Modifier un cours
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="row g-3"
              onSubmit={(e) => {
                e.preventDefault();
                modifierCours(form.id_cours);
                const modal = bootstrap.Modal.getInstance(
                  document.getElementById("modifierCours")
                );
              }}
            >
              <div className="mb-3">
                <label className="form-label">Code du cours</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.code_cours}
                  onChange={(e) =>
                    setForm({ ...form, code_cours: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.description_cours}
                  onChange={(e) =>
                    setForm({ ...form, description_cours: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">État</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.etat_cours}
                  onChange={(e) =>
                    setForm({ ...form, etat_cours: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Session</label>
                <input
                  type="text"
                  className="form-control"
                  value={form.session_id_session}
                  onChange={(e) =>
                    setForm({ ...form, session_id_session: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Validation de formulaire
(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

export default Cours;
