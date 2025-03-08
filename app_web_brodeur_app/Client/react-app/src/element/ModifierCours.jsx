import React, { useState } from "react";

const ModifierCours = ({ cours }) => {
  console.log(cours);
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

      {/* Modal Bootstrap */}
      <div
        className="modal fade"
        id={`${cours.id_cours}`}
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
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
                id={`id${cours.id_cours}`}
                type="text"
                className="form-control"
                placeholder={cours.description_cours}
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
              <button type="button" className="btn btn-primary">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifierCours;
