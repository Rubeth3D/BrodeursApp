import React, { useState, useEffect } from "react";

const classe = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    code_cours: "",
    description: "",
    groupe: "",
    cours_id_cours: "",
    professeur_id_professeur: "",
    etat_classe: "",
  });

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
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
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const modifierClasse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/classe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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

  useEffect(() => {
    fetchClasses();
  }, []);

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
                    className="btn btn-warning me-2"
                    onClick={() => modifierClasse(classe.id_classe)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => supprimerClasse(classe.id_classe)}
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
        id="createClassModal"
        tabIndex="-1"
        aria-labelledby="createClassModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createClassModalLabel">
                Ajout une nouvelle classe
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={creerClasse}>
                {[
                  { label: "Nom classe", id: "description" },
                  { label: "Groupe", id: "groupe" },

                  //on doit pas mettre l'etat, mais d'autres choses pourrait etre pertinent
                  //{ label: "Etat Classe", id: "etat_classe" },
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

export default classe;
