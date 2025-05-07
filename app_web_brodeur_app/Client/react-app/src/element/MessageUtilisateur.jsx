import React, { useState, useEffect, useMemo } from "react";
import ErreurSVG from "../image/ErreurSVG.jsx";
import SuccesSVG from "../image/SuccesSVG.jsx";
const messageUtilisateur = (reponse) => {
  const styleMessageErreurBackground = {
    backgroundColor: "rgba(220, 53, 69, 0.4)",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  const styleMessageSuccesBackground = {
    backgroundColor: "rgba(0, 128, 0, 0.4)",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  if (!reponse) {
    return null;
  }
  if (reponse.reponseCodeStatus >= 200 && reponse.reponseCodeStatus < 400) {
    return (
      <div style={styleMessageSuccesBackground}>
        {SuccesSVG()}
        {reponse.reponseMessage}
      </div>
    );
  } else if (
    reponse.reponseCodeStatus >= 400 &&
    reponse.reponseCodeStatus < 500
  ) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          {reponse.reponseMessage}
        </div>
      </>
    );
  } else if (reponse.reponseCodeStatus >= 500) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          Erreur de serveur, veuillez contacter l'equipe de developpement au
          arnaudkomodo@gmail.com
        </div>
      </>
    );
  }
};
export default messageUtilisateur;
