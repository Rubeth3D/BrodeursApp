import React, { useState, useEffect } from "react";
import Select from "react-select";

function ModalCreerClasse({ open, estFermee, rafraichir, type_utilisateur }) {
  if (!open) {
    return null;
  }
  const [nouvelleClasse, setNouvelleClasse] = useState({
    code_cours: "",
    description: "",
    groupe: "",
    professeur_id_professeur: "",
    etat_classe: "Actif",
    cours_id_cours: "",
    cours_session_id_session: "",
  });
  const [cours, setCours] = useState([]);
  const [professeur, setProfesseur] = useState([]);

  //fonction creation de classe
  const creerClasse = async () => {
    try {
      console.log(JSON.stringify(nouvelleClasse));
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

  const fetchProfesseur = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/professeur", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const donnees = await reponse.json();
      const optionsProfesseur = donnees.map((professeur) => ({
        value: professeur.id_professeur,
        label: professeur.nom_complet,
      }));
      setProfesseur(optionsProfesseur);
    } catch (err) {
      console.error("Erreur au niveau du fetch des professeurs : ", err);
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
    if (type_utilisateur === "Admin") {
      fetchProfesseur();
    }
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
                className="form-control mt-3"
                placeholder="Nouvelle description"
                name="description"
                onChange={GererChangement}
              />
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Numéro du groupe"
                name="groupe"
                onChange={GererChangement}
              />
              {type_utilisateur === "Admin" && (
                <Select
                  className="mt-3"
                  options={professeur}
                  placeholder="choisir un professeur..."
                  onChange={(option) => {
                    const updatedProfesseur = {
                      ...nouvelleClasse,
                      professeur_id_professeur: option.value,
                    };
                    setNouvelleClasse(updatedProfesseur);
                  }}
                />
              )}
              <Select
                className="mt-3"
                options={cours}
                placeholder="choisir un cours..."
                onChange={(option) => {
                  const updatedClasse = {
                    ...nouvelleClasse,
                    cours_id_cours: option.value,
                    cours_session_id_session: option.id_session,
                    code_cours: option.label,
                  };
                  setNouvelleClasse(updatedClasse);
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
