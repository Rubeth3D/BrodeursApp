import Navbar from "../../element/navbar";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState, useRef, fetchData } from "react";
function Cours() {
  const [cours, setCours] = useState([]);
  const isFetched = useRef(false);

  //fonction pour delete un cours
  const ModifierCours = () => {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#id "
        >
          Modifier
        </button>

        <div
          className="modal fade"
          id={`id${cours.id_cours}`}
          tabIndex="-1"
          aria-labelledby="modalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">
                  Modifier le cours
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <input
                  id={`id${cours.id_cours}`}
                  type="text"
                  className="form-control"
                  placeholder="allo"
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
                <button type="button" className="btn btn-primary">
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const deleteCours = async (id_cours) => {
    try {
      const deleteCours = await fetch(
        `http://localhost:8080/cours/${id_cours}`,
        {
          method: "DELETE",
        }
      );
      setCours(cours.filter((cours) => cours.id_cours !== id_cours));
    } catch (err) {
      console.log(`Erreur lors du delete du cours : ${err}`);
    }
  };
  //fonction pour get les cours
  const getCours = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/cours");
      const jsonData = await reponse.json();
      console.log(jsonData);
      setCours(jsonData);
    } catch (err) {
      console.error(`Erreur lors du fetch des cours : ${err}`);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      getCours();
      isFetched.current = true;
    }
  }, []);
  return (
    <>
      <Navbar />
      <Fragment>
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
                    onClick={() => deleteCours(cours.id_cours)}
                  >
                    delete
                  </button>
                  <ModifierCours />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mt-5"></h2>
      </Fragment>
    </>
  );
}
export default Cours;
