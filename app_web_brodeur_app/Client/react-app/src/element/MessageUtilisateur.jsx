import React, { useState, useEffect, useMemo } from "react";
import ErreurSVG from "../image/ErreurSVG.jsx";
import SuccesSVG from "../image/SuccesSVG.jsx";
const messageErreurConnexion = (reponseCodeStatus, reponseJson) => {
  console.log("Status Code : ", reponseCodeStatus);
  console.log("Reponse json : ", reponseJson);
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
  if (!reponseCodeStatus) {
    return null;
  }
  if (reponseCodeStatus.reponseCodeStatus === 200) {
    return (
      <div style={styleMessageSuccesBackground}>
        {SuccesSVG()}
        Connexion réussi!
      </div>
    );
  } else if (reponseCodeStatus.reponseCodeStatus === 404) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          Votre compte est inexistant, veuillez vous creer un compte afin de
          pouvoir vous connecter.
        </div>
      </>
    );
  } else if (reponseCodeStatus.reponseCodeStatus === 401) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          Mot de passe ou nom d'utilisateur incorrecte.
        </div>
      </>
    );
  } else if (reponseCodeStatus.reponseCodeStatus === 500) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          Erreur serveur, veuillez contactez l'equipe de developpement a
          l'adresse : arnaudkomodo@gmail.com
        </div>
      </>
    );
  }
};
export default messageErreurConnexion;
