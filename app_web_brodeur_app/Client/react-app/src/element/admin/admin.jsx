//@ts-ignore
import AffichageTables from "./AffichageTables.jsx";
import MessageUtilisateur from "../MessageUtilisateur.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";

const Admin = () => {
  return (
    <>
      <AffichageTables
        StrategieDemande={new CrudHistoriqueSessions()}
        TableAjoutable={"Historique des sessions"}
      />
    </>
  );
};

export default Admin;
