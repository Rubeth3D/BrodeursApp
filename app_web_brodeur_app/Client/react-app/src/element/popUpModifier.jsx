import React, { useState } from "react";

//Modifier un cours
function PopUpModifier({ cours }) {
  const PutCours = async (e, cours) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/cours/${cours.id_cours}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cours),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du cours");
      }
      window.location.reload();
      console.log("Cours mis à jour avec succès !");
    } catch (err) {
      console.error(`Erreur lors du update du cours : ${err}`);
    }
  };

  const [coursMisAJour, setCoursMisAJour] = useState({
    id_cours: cours.id_cours,
    code_cours: cours.code_cours,
    description_cours: cours.description_cours,
    etat_cours: cours.etat_cours,
    session_id_session: cours.session_id_session,
  });

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setCoursMisAJour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target={`#id${cours.id_cours}`}
      >
        Modifier
      </button>

      <div
        className="modal fade"
        id={`id${cours.id_cours}`}
        tabIndex="-1"
        aria-labelledby={`modalLabel${cours.id_cours}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modalLabel${cours.id_cours}`}>
                Modifier le cours
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Nouveau code du cours"
                name="code_cours"
                value={coursMisAJour.code_cours}
                onChange={gererChangement}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nouvelle description"
                name="description_cours"
                value={coursMisAJour.description_cours}
                onChange={gererChangement}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nouvel état du cours"
                name="etat_cours"
                value={coursMisAJour.etat_cours}
                onChange={gererChangement}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => PutCours(e, coursMisAJour)}
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

export default PopUpModifier;
