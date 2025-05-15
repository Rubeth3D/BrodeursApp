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
  console.log(reponseCodeStatus);
  console.log(reponseMessage);

  if (!reponseCodeStatus || !reponseMessage) return null;

  if (reponseCodeStatus >= 200 && reponseCodeStatus < 400) {
    return (
      <div style={styleSucces}>
        {SuccesSVG()}
        <span>{reponseMessage}</span>
      </div>
    );
  } else if (reponseCodeStatus >= 400 && reponseCodeStatus < 500) {
    return (
      <div style={styleErreur}>
        {ErreurSVG()}
        <span>{reponseMessage}</span>
      </div>
    );
  } else {
    return (
      <div style={styleErreur}>
        {ErreurSVG()}
        <span>
          Erreur de serveur, veuillez contacter l'equipe de developpement au
          arnaudkomodo@gmail.com
        </span>
      </div>
    );
  }
};

export default MessageUtilisateur;
