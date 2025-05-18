//@ts-ignore
import React, { useState } from "react";
import AffichageTables from "./AffichageTables.jsx";
import MessageUtilisateur from "../MessageUtilisateur.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";

const Admin = () => {
  return (
    <>
      <div className="text-center">
        <h1 className="mb-5">Tableau de l'admin</h1>
        <AffichageTables TableAjoutable={"Historique des sessions"} />
      </div>
    </>
  );
};

export default Admin;
