import React, { useState, useEffect } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";

const Equipe = () => {
  const [filtreTousEquipes, setFiltreTousEquipes] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [form, setForm] = useState({
    code_equipe: "",
    nom: "",
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
    try{
      const equipeActif = {
        ...form,
        etat_equipe: "Actif",
      };
      const response = await fetch("http://localhost:8080/equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipeActif),
      });
      if(response.ok){
        fetchEquipes();
      }
    }catch (error) {
      console.error("Erreur lors de la création de l'équipe:", error);
    }
  };

  const modifierEquipe = async(id) => {
    try{
      const response = await fetch(`http://localhost:8080/equipe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if(response.ok){
        fetchEquipes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const desactiverEquipe = async (equipe) => {
    try{
      await fetch(`http://localhost:8080/equipe/${equipe.code_equipe}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...equipe, etat_equipe: "Inactif" }),
      });

      fetchEquipes();
    } catch (error) {
      console.error("Erreur lors de la désactivation de l'équipe:", error);
    }
  }

  const viderForm = () => {
    setForm({
      code_equipe: "",
      nom: "",
    });
  };

  useEffect(() => {
    fetchEquipes();
  }, []);


  const equipeActif = equipe.filter((equipe) => equipe.etat_equipe === "Actif");
  const equipeInactif = equipe.filter((equipe) => equipe.etat_equipe === "Inactif");
  const totalEquipe = equipe.length;

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes total:</h2>
                <p className="card-text fs-4 text-primary mt-4">{totalEquipe}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes Actif:</h2>
                <p className="card-text fs-4 text-success mt-4">{equipeActif.length}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes Inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">{equipeInactif.length}</p>
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
                <th>Code équipe</th>
                <th>Nom</th>
                <th>Etat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipe.filter(equipe => equipe.etat_equipe === "Actif").map((equipe) => (
                <tr key={equipe.id_equipe}>
                  <td>{equipe.code_equipe}</td>
                  <td>{equipe.nom}</td>
                  <td>{equipe.id_cours}</td>
                  <td>{equipe.id_session}</td>
                  <td>{equipe.classe_id_classe}</td>

                  <td>
                    <button
                      className="btn btn-sn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#modifierEquipe"
                      onClick={() => setForm(equipe)}
                    >
                      <ModifierSVG />
                    </button>

                    <button
                      type="button"
                      className="btn btn-sn ms-2"
                      onClick={() => desactiverEquipe(equipe)}
                    >
                      <SupprimerSVG />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );










}

export default Equipe;
