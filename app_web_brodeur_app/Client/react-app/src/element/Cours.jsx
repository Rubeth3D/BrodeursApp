import React, { useEffect, useState, useRef } from "react";
import PopUpModifier from "../element/popUpModifier";
function Cours() {
  const url = "http://localhost:8080/cours";
  const [cours, setCours] = useState([]);
  const GetCours = async () => {
    try {
      const reponse = await fetch(url);
      const jsonData = await reponse.json();
      console.log(jsonData);
      setCours(jsonData);
    } catch (err) {
      console.error(`Erreur lors du fetch des cours : ${err}`);
    }
  };
  const estFetchedCours = useRef(false);
  useEffect(() => {
    if (!estFetchedCours.current) {
      GetCours();
      estFetchedCours.current = true;
      console.log(estFetchedCours.current);
    }
  }, []);
  const DeleteCours = async (id_cours) => {
    try {
      const deleteCours = await fetch(`${url}/${id_cours}`, {
        method: "DELETE",
      });
      setCours(cours.filter((cours) => cours.id_cours !== id_cours));
    } catch (err) {
      console.log(`Erreur lors du delete du cours : ${err}`);
    }
  };
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Code du cours</th>
            <th scope="col">Description</th>
            <th scope="col">Etat du cours</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((cours) => (
            <tr key={cours.id_cours}>
              <td>{cours.code_cours}</td>
              <td>{cours.description_cours}</td>
              <td>{cours.etat_cours}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => DeleteCours(cours.id_cours)}
                >
                  delete
                </button>
                <PopUpModifier cours={cours} />;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-5"></h2>
    </>
  );
}
export default Cours;
