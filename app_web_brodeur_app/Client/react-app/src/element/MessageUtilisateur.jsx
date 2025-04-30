import React, { useState, useEffect, useMemo } from "react";
import ErreurSVG from "../image/ErreurSVG.jsx";
import SuccesSVG from "../image/SuccesSVG.jsx";
const messageUtilisateur = (reponse) => {
  console.log("Status Code : ", reponse);
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
  if (reponse.reponseCodeStatus === 200) {
    return (
      <div style={styleMessageSuccesBackground}>
        {SuccesSVG()}
        {reponse.reponseMessage}
      </div>
    );
  } else if (reponse.reponseCodeStatus === 404) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          {reponse.reponseMessage}
        </div>
      </>
    );
  } else if (reponse.reponseCodeStatus === 401) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          {reponse.reponseMessage}
        </div>
      </>
    );
  } else if (reponse.reponseCodeStatus === 500) {
    return (
      <>
        <div style={styleMessageErreurBackground}>
          {ErreurSVG()}
          {reponse.reponseMessage}
        </div>
      </>
    );
  }
};
export default messageUtilisateur;
