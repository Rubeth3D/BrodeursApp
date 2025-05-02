import React, { useState, useEffect } from "react";
import affichageDonnees from "./affichageDonnees";
import MessageUtilisateur from "./MessageUtilisateur.jsx";
const Admin = () => {
  const [bodyLogSessions, setLogSessions] = useState({});
  const getSession = () => {
    const resultat = fetch("http://localhost:8080/historiqueDesSessions", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
  };
  return (
    <>
      <MessageUtilisateur
      />
      <affichageDonnees />
    </>
  );
};

export default Admin;
