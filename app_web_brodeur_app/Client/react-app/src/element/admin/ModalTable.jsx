import React, { useEffect, useState } from "react";
import CrudTables from "./Strategy/CrudTables.jsx";
import MessageUtilisateur from "../MessageUtilisateur.jsx";
function ModalTables({
  open,
  donneesAUtiliser,
  estFermee,
  rafraichir,
  ActionDemande,
  ModalDemande,
}) {
  if (!open) {
    return null;
  }
  if (!donneesAUtiliser) {
    return <div>Chargement...</div>;
  }

  const [messageUtilisateur, setMessageUtilisateur] = useState([]);
  const [cleesTables, setCleesTables] = useState(Object.keys(donneesAUtiliser));
  const [donnees, setDonnees] = useState(donneesAUtiliser);
  const [contenu, setContenu] = useState([]);

  const ModifierRow = (e) => {
    setDonnees({
      ...donnees,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setCleesTables(Object.keys(donnees));
    if (ModalDemande == "Modifier") {
      setContenu(Object.values(donnees));
    }
    console.log("contenu", contenu[1]);
    console.log("contenmodal demande ", ModalDemande);
  }, [donnees]);

  return (
    <>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        id={`id${contenu[0]}`}
        tabIndex="-1"
        aria-labelledby={`modalLabel${contenu[0]}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`modalLabel${contenu[0]}`}>
                {ModalDemande}
              </h5>
            </div>
            <div className="modal-body">
              {cleesTables.slice(1).map((key, i) => (
                <div className="mb-3 row" key={i}>
                  <label
                    htmlFor={`input-${i}`}
                    className="col-sm-4 col-form-label"
                  >
                    {key}
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id={`input-${i}`}
                      name={cleesTables[i + 1]}
                      value={contenu[i + 1]}
                      onChange={(e) => {
                        ModifierRow(e);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => estFermee()}
              >
                Fermer
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  if (ModalDemande === "Modifier") {
                    await ActionDemande({ id: contenu[0], body: donnees });
                    rafraichir();
                    return;
                  }
                  const body = await JSON.stringify(donnees);
                  await ActionDemande(body);
                  rafraichir();
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

export default ModalTables;
