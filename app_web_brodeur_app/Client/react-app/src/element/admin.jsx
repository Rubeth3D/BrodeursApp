import React, { useState, useEffect } from "react";
//@ts-ignore
import AffichageDonnees from "./AffichageDonnees.jsx";
import MessageUtilisateur from "./MessageUtilisateur.jsx";
const Admin = () => {
  const [bodyHistoriqueSessions, setLogSessions] = useState([]);
  const getSession = async () => {
    const resultat = await fetch(
      "http://localhost:8080/HistoriqueDesSessions",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const resultatJson = await resultat.json();
    setLogSessions(resultatJson);
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <>
      <table className="table table-hover mt-5 text-center">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {bodyHistoriqueSessions.map((LogSession) => (
            <tr key={LogSession._id}>
              <h1>{LogSession.courriel}</h1>
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </>
  );
};

export default Admin;
