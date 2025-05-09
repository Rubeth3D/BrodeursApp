//@ts-ignore
import AffichageAdmin from "./AffichageAdmin.jsx";
import MessageUtilisateur from "../MessageUtilisateur.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";

const Admin = () => {
  return (
    <>
      <AffichageAdmin
        DonneesDemandes={1}
        StrategyDemande={new CrudHistoriqueSessions()}
      />
    </>
  );
};

export default Admin;
