import React, { useState } from "react";
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
      etat_classe: "Actif",
      cours_session_id_session: "1"
    });

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
              <h5 className="modal-title" >
                Nouvelle classe 
              </h5>
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
