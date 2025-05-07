import React from "react";

function ModalDeconnexion({ open, estFermee, deconnexion }) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      aria-labelledby="modalDeconnexionLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalDeconnexionLabel">
              Confirmation de déconnexion
            </h5>
          </div>

          <div className="modal-body">
            <p>Voulez-vous vraiment vous déconnecter ?</p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={estFermee} // Ferme le modal
            >
              Fermer
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deconnexion} // Appelle la fonction de déconnexion
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDeconnexion;
