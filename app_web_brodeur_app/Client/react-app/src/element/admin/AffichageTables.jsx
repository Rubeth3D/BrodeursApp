import React, { useState, useEffect } from "react";
import CrudTables from "./Strategy/CrudTables.jsx";
import ModifierSVG from "../../image/ModifierSVG.jsx";
import SupprimerSVG from "../../image/SupprimerSVG.jsx";
import ModalModifier from "./ModalModifier.jsx";
function AffichageTables({ StrategieDemande }) {
  const crudTables = new CrudTables(StrategieDemande);
  const [bodyDonnees, setBodyDonnees] = useState([]);
  const [clesDonnees, setCleesDonnees] = useState([]);
  const [modalModifierEstOuvert, setModalModifierEstOuvert] = useState(false);
  const [donneesAModifier, setDonneesAModifier] = useState([]);
  const ClassNameTables = "table table-hover  text-center mb-0 ";
  const classNameActions = "d-flex";
  const classNameBoutonsActions = "btn btn-sm border";
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
  useEffect(() => {
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
      <ModalModifier
        open={modalModifierEstOuvert}
        donneesAModifier={donneesAModifier}
        estFermee={() => {
          setModalModifierEstOuvert(false);
        }}
        rafraichir={() => {
          fetchData();
        }}
        StrategieDemande={StrategieDemande}
      />
    </>
  );
}

export default AffichageTables;
