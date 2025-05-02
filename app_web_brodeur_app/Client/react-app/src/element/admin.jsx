import React, { useState, useEffect } from "react";
import AffichageDonnees from "./AffichageDonnees.jsx";
import MessageUtilisateur from "./MessageUtilisateur.jsx";
const Admin = () => {
  const [bodyLogSessions, setLogSessions] = useState({});
  const getSession = () => {
    const resultat = fetch("http://localhost:8080/historiqueDesSessions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    console.log("Resultat : ", resultat);
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <>
      <AffichageDonnees />
    </>
  );
};

export default Admin;
