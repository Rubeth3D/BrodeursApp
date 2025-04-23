import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Value } from "sass";

function ModalCreerClasse({ open, estFermee, rafraichir }) {
  if (!open) {
    return null;
  }
  const [nouvelleClasse, setNouvelleClasse] = useState({
    code_cours: "",
    description: "",
    groupe: "1",
    professeur_id_professeur: "1",
    etat_classe: "Actif",
    cours_id_cours: "",
    cours_session_id_session: "",
  });
  const [cours, setCours] = useState([]);

  //fonction creation de classe
  const creerClasse = async () => {
    try {
      console.log(JSON.stringify(nouvelleClasse))
      const response = await fetch("http://localhost:8080/classe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(nouvelleClasse),
      });
      if (!response.ok) {
        const erreur = await response.json();
        console.error("Erreur de création :", erreur);
      } else {
        console.log("Classe créée avec succès");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCours = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/cours", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const donnees = await reponse.json();
      const options = donnees.map((cours) => ({
        value: cours.id_cours,
        label: cours.code_cours,
        id_session: cours.session_id_session,
      }));
      setCours(options);
    } catch (err) {
      console.error("Erreur au niveau du fetch des classes : ", err);
    }
  };

  //gerer les changements au niveau du usestate
  const GererChangement = (e) => {
    setNouvelleClasse({
      ...nouvelleClasse,
      [e.target.name]: e.target.value,
    });
  };

  const EnregistrerClasse = () => {
    creerClasse();
    estFermee(false);
    rafraichir();
  };
  
  useEffect(() => {
    fetchCours();
  }, []);
  return (
    <>
      <div
        className=" modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nouvelle classe</h5>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Nouveau code du cours"
                name="code_cours"
                onChange={GererChangement}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nouvelle description"
                name="description"
                onChange={GererChangement}
              />
              <Select
                className="mt-2"
                options={cours}
                onChange={(option) => {
                  setNouvelleClasse({
                    ...nouvelleClasse,
                    cours_id_cours: option.value,
                    cours_session_id_session: option.id_session,
                  });
                  console.log("Nouvelle classe : ", nouvelleClasse);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => estFermee(false)}
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  EnregistrerClasse();
                }}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ModalCreerClasse;
