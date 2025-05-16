import React, { useState, useEffect } from "react";
import CrudTables from "./Strategy/CrudTables.jsx";
import ModifierSVG from "../../image/ModifierSVG.jsx";
import SupprimerSVG from "../../image/SupprimerSVG.jsx";
import ModalTables from "./ModalTables.jsx";
import CrudHistoriqueSessions from "./Strategy/CrudHistoriqueSessions.jsx";
function AffichageTables({ StrategieDemande, TableAjoutable }) {
  const [bodyDonnees, setBodyDonnees] = useState([]);
  const [crudTables, setCrudTables] = useState(new CrudHistoriqueSessions());

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
    const data = await crudTables.ReadDonnees();
    setBodyDonnees(data);
    console.log("data : ", data[0]);
    setCleesDonnees(Object.keys(data[0]));
  };
  const createData = () => {
    crudTables.CreateDonnees();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className=" col-xxl-10 col-lg-8 col-sm-6">
            <div className="d-flex m-0">
              <select className=" rounded-2" name="tables" id="tables">
                <option value="HistoriqueSessions">HistoriqueSessions</option>
                <option value="Commentaires">Commentaires</option>
                <option value="Classe">Classe</option>
                <option value="Equipe">Equipe</option>
                <option value="Cours">Cours</option>
                <option value="Evaluation">Evaluation</option>
                <option value="HistoriqueSessions">HistoriqueSessions</option>
                <option value="HistoriqueSessions">HistoriqueSessions</option>
                <option value="HistoriqueSessions">HistoriqueSessions</option>
                <option value="HistoriqueSessions">HistoriqueSessions</option>
              </select>
              <input
                type="text"
                className="form-control rounded-2"
                placeholder="Rechercher une entree par son code de cours..."
                onChange={() => {}}
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
                  + Ajouter un element de {TableAjoutable}
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
            {bodyDonnees.map((Donnees, i) => (
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
                      await crudTables.DeleteDonnees(id);
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
      <ModalTables
        open={modalModifierEstOuvert}
        donneesAUtiliser={donneesAModifier}
        estFermee={() => {
          setModalModifierEstOuvert(false);
        }}
        rafraichir={() => {
          fetchData();
        }}
        ActionDemande={async ({ id, body }) => {
          crudTables.UpdateDonnees({ id, body });
        }}
        ModalDemande={"Modifier"}
      />
      <ModalTables
        open={modalCreerEstOuvert}
        donneesAUtiliser={bodyDonnees[0]}
        estFermee={() => {
          setModalCreerEstOuvert(false);
        }}
        rafraichir={() => {
          fetchData();
        }}
        ActionDemande={async (body) => {
          crudTables.CreateDonnees(body);
        }}
        ModalDemande={"Creer"}
      />
    </>
  );
}

export default AffichageTables;
