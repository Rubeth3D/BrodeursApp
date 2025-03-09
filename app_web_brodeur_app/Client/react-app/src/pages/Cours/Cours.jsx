import Navbar from "../../element/navbar";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState, useRef, fetchData } from "react";
function Cours() {
  const [cours, setCours] = useState([]);
  const estFetched = useRef(false);

  const ModifierCours = ({ cours }) => {
    const [coursMisAJour, setCoursMisAJour] = useState({
      id_cours: cours.id_cours,
      code_cours: cours.code_cours,
      description_cours: cours.description_cours,
      etat_cours: cours.etat_cours,
      session_id_session: cours.session_id_session,
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCoursMisAJour((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    return (
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={`#id${cours.id_cours}`}
        >
          Modifier
        </button>

        <div
          className="modal fade"
          id={`id${cours.id_cours}`}
          tabIndex="-1"
          aria-labelledby={`modalLabel${cours.id_cours}`}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`modalLabel${cours.id_cours}`}>
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
                  type="text"
                  className="form-control"
                  placeholder="Nouveau code du cours"
                  name="code_cours"
                  value={coursMisAJour.code_cours}
                  onChange={handleInputChange} // Add the change handler
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Nouvelle description"
                  name="description_cours"
                  value={coursMisAJour.description_cours}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Nouvel état du cours"
                  name="etat_cours"
                  value={coursMisAJour.etat_cours}
                  onChange={handleInputChange}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => UpdateCours(e, coursMisAJour)} // Pass the updated state
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const UpdateCours = async (e, updatedCours) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/cours/${updatedCours.id_cours}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCours),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du cours");
      }
      window.location.reload();
      console.log("Cours mis à jour avec succès !");
    } catch (err) {
      console.error(`Erreur lors du update du cours : ${err}`);
    }
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
    if (!estFetched.current) {
      getCours();
      estFetched.current = true;
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
                  <ModifierCours cours={cours} />
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
