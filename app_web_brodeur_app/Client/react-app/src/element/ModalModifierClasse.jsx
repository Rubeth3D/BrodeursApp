import React, { useEffect, useState } from "react";

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
        // Handle success
      }
    } catch (error) {
      console.error(error);
    }
  };

  const chargerEtudiants = async () => {
    try {
      const response = await fetch(`http://localhost:8080/etudiant`);
      const data = await response.json();
      setEtudiantClasse(data);  // Mise à jour de l'état avec les étudiants récupérés
    } catch (err) {
      console.error("Erreur lors du chargement des étudiants :", err);
    }
  };

  const SauvegarderClasse = () => {
    modifierClasse(classe.id_classe);
    estFermee(false);
    rafraichir();
  };

  useEffect(() => {
    if (open) {  // Charger les étudiants uniquement si le modal est ouvert
      chargerEtudiants();
    }
  }, [open, classe.id_classe]);

  return (
    <>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        id={`id${classe.id_classe}`}
        tabIndex="-1"
        aria-labelledby={`modalLabel${classe.id_classe}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
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

              <div className="mt-4">
                <h6>Étudiants inscrits</h6>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nom complet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etudiantClasse.length > 0 ? (
                      etudiantClasse.map((etudiant, index) => (
                        <tr key={index}>
                          <td>{etudiant.nom_complet}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="">
                          Aucun étudiant trouvé.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
