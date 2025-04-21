import { bottom } from "@popperjs/core";
import React, { useState } from "react";
import ReactDom from "react-dom";

function ModalModifierClasse({ open, classe, estFermee, rafraichir }) {
  if (!open) {
    return null;
  }
  if (!classe) {
    return <div>Chargement...</div>;
  }

  const [classeAModifier, setclasseAModifier] = useState({
    code_cours: classe.code_cours,
    description: classe.description,
    session: classe.session,
    groupe: classe.groupe,
    professeur_id_professeur: classe.professeur_id_professeur,
    etat_classe: classe.etat_classe,
    cours_id_cours: classe.cours_id_cours,
    cours_session_id_session: classe.cours_session_id_session,
  });
  const ModifierClasseSetData = (e) => {
    setclasseAModifier({
      ...classeAModifier,
      [e.target.name]: e.target.value,
    });
  };
  const modifierClasse = async (id) => {
    try {
      console.log("CLasse a modifier : ", classeAModifier);
      const reponse = await fetch(`http://localhost:8080/classe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(classeAModifier),
      });
      if (reponse.ok) {
      }
    } catch (error) {
      console.error(error);
    }
  };
  const SauvegarderClasse = () => {
    modifierClasse(classe.id_classe);
    estFermee(false);
    rafraichir();
  };

  return (
    <>
      <div
        className=" modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        id={`id${classe.id_classe}`}
        tabIndex="-1"
        aria-labelledby={`modalLabel${classe.id_classe}`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modalLabel${classe.id_classe}`}>
                Modifier la classe {classe.code_cours}
              </h5>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Nouveau code du cours"
                name="code_cours"
                value={classeAModifier.code_cours}
                onChange={ModifierClasseSetData}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Nouvelle description"
                name="description"
                value={classeAModifier.description}
                onChange={ModifierClasseSetData}
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
                  SauvegarderClasse();
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
export default ModalModifierClasse;
