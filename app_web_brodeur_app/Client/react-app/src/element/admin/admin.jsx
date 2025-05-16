//@ts-ignore
import React, { useState } from "react";
import AffichageTables from "./AffichageTables.jsx";
import MessageUtilisateur from "../MessageUtilisateur.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";

const Admin = () => {
  const [tableAffiche, setTableAffiche] = useState(
    new CrudHistoriqueSessions()
  );
  return (
    <>
      <AffichageTables
        StrategieDemande={tableAffiche}
        TableAjoutable={"Historique des sessions"}
      />
    </>
  );
};

export default Admin;
