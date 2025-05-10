import React, { useEffect, useState } from "react";
import CrudTables from "./Strategy/CrudTables.jsx";
function ModalModifier({
  open,
  donnees,
  estFermee,
  rafraichir,
  StrategieDemande,
}) {
  if (!open) {
    return null;
  }
  if (!donnees) {
    return <div>Chargement...</div>;
  }
  const crudTables = new CrudTables(StrategieDemande);

  const [classeAModifier, setclasseAModifier] = useState({});

  const [etudiantClasse, setEtudiantClasse] = useState([]);
  const ModifierClasseSetData = (e) => {
    setclasseAModifier({
      ...classeAModifier,
      [e.target.name]: e.target.value,
    });
  };

  const modifierClasse = async (id) => {
    try {
      console.log("Classe à modifier : ", classeAModifier);
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

  const chargerEtudiants = async () => {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      try {
      } catch (err) {}
    }
  };

  const SauvegarderClasse = () => {
    modifierClasse(donnees.id_classe);
    estFermee(false);
    rafraichir();
  };

  useEffect(() => {
    if (open) {
    }
  }, [open, donnees.id_classe]);

  return (
    <>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        id={`id${donnees.id_classe}`}
        tabIndex="-1"
        aria-labelledby={`modalLabel${donnees.id_classe}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modalLabel${donnees.id_classe}`}>
                Modifier la classe {donnees.code_cours}
              </h5>
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
                onClick={SauvegarderClasse}
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
