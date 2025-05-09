import React, { useState, useEffect } from "react";
import CrudAdmin from "./Strategy/CrudAdmin";
import ModifierSVG from "../../image/ModifierSVG";
import SupprimerSVG from "../../image/SupprimerSVG";
function AffichageAdmin({
  DonneesDemandes,
  StrategyDemande: StrategieDemande,
}) {
  const crudAdmin = new CrudAdmin(StrategieDemande);
  const [bodyDonnees, setBodyDonnees] = useState([]);
  const [clesDonnees, setCleesDonnees] = useState([]);

  const ClassNameTables = "table table-hover  text-center mb-0 ";
  const classNameActions = "d-flex justify-content-center  border ";
  const styleTable = {
    overflowY: "auto",
    height: "500px",
    maxWidth: "100%",
  };
  const styleHeader = {
    position: "sticky",
    top: 0,
    zIndex: 2,
  };
  const fetchData = async () => {
    const data = await crudAdmin.ReadDonnees();
    setBodyDonnees(data);
    console.log("data : ", data[0]);
    setCleesDonnees(Object.keys(data[0]));
  };
  useEffect(() => {
    crudAdmin.changerStrategie(StrategieDemande);
    fetchData();
  }, []);
  return (
    <>
      <div className="border rounded" style={styleTable}>
        <table className={ClassNameTables}>
          <thead>
            <tr>
              {clesDonnees.slice(1).map((key) => (
                <th
                  className="border-bottom-1 border-left-1 border-right-1"
                  style={styleHeader}
                  key={key}
                >
                  {key}
                </th>
              ))}
              <th>Actions</th>
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
                <div className={classNameActions}>
                  <button className="btn btn-sm border">{ModifierSVG()}</button>
                  <button
                    className="btn btn-sm border"
                    onClick={async () => {
                      const id = Object.values(Donnees)[0];
                      await crudAdmin.DeleteDonnees(id);
                      fetchData();
                    }}
                  >
                    {SupprimerSVG()}
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AffichageAdmin;
