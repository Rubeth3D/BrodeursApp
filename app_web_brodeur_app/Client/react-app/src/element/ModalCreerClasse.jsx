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
    cours_id_cours: "1",
    etat_classe: "Active",
    cours_session_id_session: "",
  });
  const [sessions, setSessions] = useState([]);
  const [sessionSelectionne, setSessionSelectionne] = useState(null);
  //fonction creation de classe
  const creerClasse = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelleClasse),
      });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSessions = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/sessionCours", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const donnees = await reponse.json();
      const options = donnees.map((session) => ({
        value: session.id_session,
        label: session.code_session,
      }));
      setSessions(options);
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
    fetchSessions();
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
                options={sessions}
                onChange={(option) => {
                  setNouvelleClasse({
                    ...nouvelleClasse,
                    cours_session_id_session: option.value,
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
