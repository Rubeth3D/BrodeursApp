import React, { useState, useEffect } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";

const Equipe = () => {
  const [classes, setClasses] = useState([]);
  const [etudiants, setEtudiants] = useState([]);
  const [filtreTousEquipes, setFiltreTousEquipes] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    etudiant: [], 
    classe_id_classe: "",
  });

  const fetchEquipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/equipe", {
        method:"GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setEquipe(data);
      setFiltreTousEquipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const creerEquipe = async (e) => {
    e.preventDefault();
    try {
      const equipeActif = {
        ...form,
        etat_equipe: "Active",
      };
      const reponse = await fetch("http://localhost:8080/equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipeActif),
      });
  
      if (reponse.ok) {
        fetchEquipes(); 
        viderForm(); 
      }
    } catch (error) {
      console.error("Erreur lors de la création d'équipe : ", error);
    }
  };
  
  
  const modifierEquipe = async (id_equipe) => {
    try {
      await fetch(`http://localhost:8080/equipe/${id_equipe}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          etat_equipe: "Active",
        }),
      });
      await fetch(`http://localhost:8080/etudiantEquipe/${id_equipe}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      for (const idEtudiant of form.etudiant) {
        await fetch("http://localhost:8080/etudiantEquipe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            equipe_id_equipe: id_equipe,
            etudiant_id_etudiant: idEtudiant,
          }),
        });
      }
      fetchEquipes();
      viderForm();
    } catch (error) {
      console.error("Erreur lors de la modification de l'équipe:", error);
    }
  };

  const desactiverEquipe = async (equipe) => {
    try{
      await fetch(`http://localhost:8080/equipe/${equipe.id_equipe}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...equipe, etat_equipe: "Inactive" }),
      });

      fetchEquipes();
    } catch (error) {
      console.error("Erreur lors de la désactivation de l'équipe:", error);
    }
  }

  const fetchEtudiants = async () => {
      try{
        const response = await fetch("http://localhost:8080/etudiant", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setEtudiants(data);
      }
      catch (error) {
        console.error("Erreur lors de la récupération des étudiants :", error);
      }
    };


    // Fonction pour gérer le changement de l'état des cases à cocher : Aider par ChatGPT
    const handleCheckboxChange = (e, id_etudiant) => {           
      const { checked } = e.target;
      if (checked) {
        setForm((prevForm) => ({
          ...prevForm,
          etudiant: [...(prevForm.etudiant || []), id_etudiant],
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          etudiant: (prevForm.etudiant || []).filter((id) => id !== id_etudiant),
        }));
      }
    };
    
    const fetchClasses = async () => {
      try {
        const reponse = await fetch("http://localhost:8080/classe", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const donnees = await reponse.json();
        const options = donnees.map((classe) => ({
          value: classe.id_classe,
          label: classe.description,
        }));
        setClasses(options);
      } catch (err) {
        console.error("Erreur au niveau du fetch des classes : ", err);
      }
    };

    
    const viderForm = () => {
      setForm({
        nom: "",
        etudiant: [],
        classe_id_classe: "",
      });
    };
    

    useEffect(() => {
      fetchEquipes();
      fetchEtudiants();
      fetchClasses();
  }, []);


  const equipeActif = equipe.filter((equipe) => equipe.etat_equipe === "Active");
  const equipeInactif = equipe.filter((equipe) => equipe.etat_equipe === "Inactive");
  const totalEquipe = equipe.length;

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes total:</h2>
                <p className="card-text fs-4 text-primary mt-4">{totalEquipe}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes Actif:</h2>
                <p className="card-text fs-4 text-success mt-4">{equipeActif.length}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'équipes Inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">{equipeInactif.length}</p>
              </div>
            </div>
          </div>
          <br />
          <h1 className="text-center mb-4 mt-5">Tableau des équipes</h1>
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
                      if(searchTerm === ""){
                        setEquipe(filtreTousEquipes);
                      } else{
                        setEquipe(filtreTousEquipes.filter((equipe) =>
                          equipe.nom.toLowerCase().includes(searchTerm)
                        ));
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
                <th>Nom</th>
                <th>Nom classe</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipe.filter(equipe => equipe.etat_equipe === "Active").map((equipe) => (
                <tr key={equipe.id_equipe}>
                  <td>{equipe.nom}</td>
                  <td>{equipe.classe_id_classe}</td>
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

        <div 
          className="modal fade"
          id="creerEquipe"
          tabIndex="-1"
          aria-labelledby="creerEquipeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"
                  id="creerEquipeLabel"
                  >Ajouter une équipe
                </h5>
                <button
                  type ="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="row g-3 needs-validation" noValidate onSubmit={creerEquipe}>
                  
                  <div className='col-mb-4'>
                    <label htmlFor="validationCustom02" className="form-label">Nom d'équipe</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="validationCustom02" 
                      value={form.nom} 
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      required
                    />
                    <div className="valid-feedback">Bien</div>
                    <div className="invalid-feedback">Nom d'équipe requis</div>
                  </div>

                  <div className="col-mb-4">
                      <label htmlFor="etudiants">Sélectionner des étudiants</label>
                      <div id="etudiants">
                        {etudiants.map((etudiant) => (
                          <div key={etudiant.id_etudiant} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`etudiant-${etudiant.id_etudiant}`}
                              value={etudiant.id_etudiant}
                              onChange={(e) => handleCheckboxChange(e, etudiant.id_etudiant)}
                            />
                            <label className="form-check-label" htmlFor={`etudiant-${etudiant.id_etudiant}`}>
                              {etudiant.nom_complet}
                            </label>
                          </div>
                        ))}
                      </div>
                    <div className="valid-feedback">Bien</div>
                    <div className="invalid-feedback">Sélectionner au moins un étudiant requis</div>
                  </div>

                  <div className="col-mb-4">
                    <label htmlFor="validationCustom04" className="form-label">Sélectionner une classe</label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      value={form.classe_id_classe}
                      onChange={(e) => setForm({ ...form, classe_id_classe: e.target.value })}
                      required
                    >
                      <option value="">Sélectionner une classe</option>
                      {classes.map((classe) => (
                        <option key={classe.value} value={classe.value}>
                          {classe.label}
                        </option>
                      ))}
                    </select>
                    <div className="valid-feedback">Bien</div>  
                    <div className="invalid-feedback">Sélectionner une classe requis</div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <span className="visually-hidden">Ajouter une équipe</span>
                    Ajouter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="modal fade"
          id="modifierEquipe"
          tabIndex="-1"
          aria-labelledby="modifierEquipeLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"
                  id= "modifierEquipeLabel">
                  Modifier une équipe
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form className="row g-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    modifierEquipe(form.id_equipe);
                    const modal = bootstrap.Modal.getInstance
                      (document.getElementById("modifierEquipe")
                    );
                    modal.hide();
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Nom d'équipe</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="etudiants">Sélectionner des étudiants</label>
                  <div id="etudiants">
                    {etudiants.map((etudiant) => (
                      <div key={etudiant.id_etudiant} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`etudiant-${etudiant.id_etudiant}`}
                          value={etudiant.id_etudiant}
                          onChange={(e) => handleCheckboxChange(e, etudiant.id_etudiant)}
                        />
                        <label className="form-check-label" htmlFor={`etudiant-${etudiant.id_etudiant}`}>
                          {etudiant.nom_complet}
                        </label>
                      </div>
                    ))}
                  </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="validationCustom04" className="form-label">Sélectionner une classe</label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      value={form.classe_id_classe}
                      onChange={(e) => setForm({ ...form, classe_id_classe: e.target.value })}
                      required
                    >
                      <option value="">Sélectionner une classe</option>
                      {classes.map((classe) => (
                        <option key={classe.value} value={classe.value}>
                          {classe.label}
                        </option>
                      ))}
                    </select>
                    <div className="valid-feedback">Bien</div>  
                    <div className="invalid-feedback">Sélectionner une classe requis</div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    <span className="visually-hidden">Modifier une équipe</span>
                    Modifier
                  </button>
                </form>
              </div>
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

export default Equipe;