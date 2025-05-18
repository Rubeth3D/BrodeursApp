import React, { useState, useEffect, useRef, useMemo } from "react";
import CrudTables from "./Strategy/CrudTables.jsx";
import ModifierSVG from "../../image/ModifierSVG.jsx";
import SupprimerSVG from "../../image/SupprimerSVG.jsx";
import ModalNoSql from "./ModalTables.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";
import CrudCommentaire from "./Strategy/CrudCommentaires.jsx";
function AffichageTables() {
  const crudTables = useRef(new CrudTables(new CrudHistoriqueSessions()));
  const [bodyDonnees, setBodyDonnees] = useState([]);
  const [crudChangeable, setCrudChangeable] = useState(
    new CrudHistoriqueSessions()
  );
  const [requete, setRequete] = useState(null);
  const [tableAfficher, setTableAfficher] = useState("Historique de session");
  const [clesDonnees, setCleesDonnees] = useState([]);
  const [modalModifierEstOuvert, setModalModifierEstOuvert] = useState(false);
  const [modalCreerEstOuvert, setModalCreerEstOuvert] = useState(false);
  const [donneesAModifier, setDonneesAModifier] = useState([]);
  const [donneesACreer, setDonneesACreer] = useState([]);
  const ClassNameTables = "table table-hover  text-center mb-0 ";
  const classNameActions = "d-flex";
  const classNameBoutonsActions = "btn btn-sm border";
  const classNameHeaders = "border-bottom-1 border-left-1 border-right-1";
  const styleTable = {
    overflowY: "auto",
    height: "500px",
    maxWidth: "fit-size",
  };
  const styleHeader = {
    position: "sticky",
    top: 0,
    zIndex: 2,
  };
  const fetchData = async () => {
    const data = await crudTables.current.ReadDonnees();
    console.log(data);
    setBodyDonnees(data);
    console.log("data : ", data[0]);
    setCleesDonnees(Object.keys(data[0]));
  };
  const tablesFiltrees = useMemo(() => {
    if (!Array.isArray(bodyDonnees) || bodyDonnees.length === 0) {
      return [];
    }

    // Filtrage de base : bodyDonnes actifs
    const tablesActives = bodyDonnees;

    // Si pas de requête, retourner toutes les classes actives
    if (!requete) {
      return tablesActives;
    }

    // Si requête, filtrer en plus sur le code du cours
    return tablesActives.filter(
      (bodyDonnees) => bodyDonnees.id_utilisateur == requete
    );
  }, [requete, bodyDonnees]);
  useEffect(() => {
    crudTables.current.ChangerStrategie(crudChangeable);
    fetchData();
  }, [crudChangeable]);
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className=" col-xxl-10 col-lg-8 col-sm-6">
            <div className="d-flex m-0">
              <select
                className=" rounded-2"
                name="tables"
                id="tables"
                onChange={(e) => {
                  const valeureSelectionne = e.target.value;
                  var crudInstance;
                  if (valeureSelectionne === "HistoriqueSessions") {
                    crudInstance = new CrudHistoriqueSessions();
                  } else if (valeureSelectionne === "Commentaires") {
                    crudInstance = new CrudCommentaire();
                  }

                  setCrudChangeable(crudInstance);
                  setTableAfficher(valeureSelectionne);
                  console.log("Nom de la table :", valeureSelectionne);
                }}
              >
                <option value="HistoriqueSessions">HistoriqueSessions</option>
                <option value="Commentaires">Commentaires</option>
              </select>
              <input
                type="text"
                className="form-control rounded-2"
                placeholder="Rechercher une entree par son id_utilisateur..."
                onChange={(e) => {
                  setRequete(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="col-xxl-2 col-lg-4">
            <div className="d-flex m-0">
              <div className="d-flex m-0">
                <button
                  type="button"
                  className="btn btn-btn btn-outline-success btn-rounded "
                  data-bs-toggle="modal"
                  data-bs-target="#createClassModal"
                  onClick={() => {
                    setModalCreerEstOuvert(true);
                  }}
                >
                  + Ajouter un element de {tableAfficher}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded" style={styleTable}>
        <table className={ClassNameTables}>
          <thead>
            <tr>
              {clesDonnees.slice(1).map((key) => (
                <th className={classNameHeaders} style={styleHeader} key={key}>
                  {key}
                </th>
              ))}
              <th className={classNameHeaders} style={styleHeader}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tablesFiltrees.map((Donnees, i) => (
              <tr key={i}>
                {Object.values(Donnees)
                  .slice(1)
                  .map((val, j) => (
                    <td className="border" key={j + 1}>
                      {val}
                    </td>
                  ))}
                <td className={classNameActions}>
                  <button
                    className={classNameBoutonsActions}
                    onClick={() => {
                      setModalModifierEstOuvert(true);
                      setDonneesAModifier(Donnees);
                    }}
                  >
                    {ModifierSVG()}
                  </button>

                  <button
                    className={classNameBoutonsActions}
                    onClick={async () => {
                      const id = Object.values(Donnees)[0];
                      await crudChangeable.DeleteDonnees(id);
                      fetchData();
                    }}
                  >
                    {SupprimerSVG()}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalNoSql
        open={modalModifierEstOuvert}
        donneesAUtiliser={donneesAModifier}
        estFermee={() => {
          setModalModifierEstOuvert(false);
        }}
        rafraichir={() => {
          fetchData();
        }}
        ActionDemande={async (id, body) => {
          return crudTables.current.UpdateDonnees(id, body);
        }}
        ModalDemande={"Modifier"}
      />
      <ModalNoSql
        open={modalCreerEstOuvert}
        donneesAUtiliser={bodyDonnees[0]}
        estFermee={() => {
          setModalCreerEstOuvert(false);
        }}
        rafraichir={() => {
          fetchData();
        }}
        ActionDemande={async (body) => {
          return crudTables.current.CreateDonnees(body);
        }}
        ModalDemande={"Creer"}
      />
    </>
  );
}

export default AffichageTables;
