import React from "react";
import ErreurSVG from "../image/ErreurSVG.jsx";
import SuccesSVG from "../image/SuccesSVG.jsx";

const MessageUtilisateur = ({ reponseCodeStatus, reponseMessage }) => {
  const styleErreur = {
    backgroundColor: "rgba(220, 53, 69, 0.4)",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const styleSucces = {
    backgroundColor: "rgba(0, 128, 0, 0.4)",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  if (!reponseCodeStatus || !reponseMessage) return null;

  if (reponseCodeStatus === 200) {
    return (
      <div style={styleSucces}>
        {SuccesSVG()}
        <span>{reponseMessage}</span>
      </div>
    );
  } else {
    return (
      <div style={styleErreur}>
        {ErreurSVG()}
        <span>{reponseMessage}</span>
      </div>
    );
  }
};

export default MessageUtilisateur;
