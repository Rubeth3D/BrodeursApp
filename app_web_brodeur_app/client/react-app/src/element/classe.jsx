import React, { useState, useEffect, useMemo } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";
import ModalModifierClasse from "./ModalModifierClasse.jsx";
import ModalCreerClasse from "./ModalCreerClasse.jsx";


const Classe = () => {
  const [donneesModal, setDonnesModal] = useState(null);
  const EtatDesactiverClasse = "Inactive";
  const [requete, setRequete] = useState(null);
  const [classes, setClasses] = useState([]);
  const [compteurClasse, setCompteurClasse] = useState(0);
  const [compteurClasseActive, setCompteurClasseActive] = useState(0);
  const [compteurClasseInactive, setCompteurClasseInactive] = useState(0);
  const [modalModifierEstOuvert, setModalModifierEstOuvert] = useState(false);
  const [modalCreerClasseEstOuvert, setModalCreerClasseEstOuvert] =
    useState(false);

  const classesFiltrees = useMemo(() => {
    if (!classes) {
      console.log("Pas de classe");
      return [];
    }
    if (!requete) {
      console.log("Pas de requête");
      return classes;
    }
    return classes.filter((classe) =>
      classe.code_cours.toLowerCase().includes(requete.toLowerCase())
    );
  }, [requete, classes]);
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      console.error("Erreur au niveau du fetch des classes : ", err);
    }
  };

  const desactiverClasse = async (id) => {
    try {
      console.log("Classe a modifier : ", EtatDesactiverClasse);
      const response = await fetch(
        `http://localhost:8080/classe/desactiverClasse/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ etat_classe: EtatDesactiverClasse }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour mettre à jour les compteurs
  function GererCompteursClasses(liste) {
    let actives = 0;
    let inactives = 0;

    liste.forEach((classe) => {
      if (classe.etat_classe === "Active") {
        actives++;
      } else {
        inactives++;
      }
    });

    setCompteurClasse(liste.length);
    setCompteurClasseActive(actives);
    setCompteurClasseInactive(inactives);
  }

  useEffect(() => {
    console.log("Fetch de la classe");
    fetchClasses();
  }, []);

  useEffect(() => {
    GererCompteursClasses(classes);
  }, [classes]);

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes total:</h2>
                <p className="card-text fs-4 text-primary mt-4">
                  {compteurClasse}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes active:</h2>
                <p className="card-text fs-4 text-success mt-4">
                  {compteurClasseActive}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5">Nombre de classes inactive:</h2>
                <p className="card-text fs-4 text-danger mt-4">
                  {compteurClasseInactive}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-center mb-5">Tableau des classes</h1>
        <div className="container my-3">
          <div className="row">
            <div className=" col-xxl-10 col-lg-8 col-sm-6">
              <div className="d-flex m-0">
                <input
                  type="text"
                  className="form-control rounded-2"
                  placeholder="Rechercher une classe par son code de cours..."
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
                    className="btn btn-btn btn-outline-success btn-rounded" // source : https://mdbootstrap.com/docs/standard/components/buttons/
                    data-bs-toggle="modal"
                    data-bs-target="#createClassModal"
                    onClick={() => {
                      setModalCreerClasseEstOuvert(true);
                    }}
                  >
                    + Ajouter une classe
                  </button>
                </div>
              </div>
            </div>
            <ModalCreerClasse
              open={modalCreerClasseEstOuvert}
              estFermee={() => {
                setModalCreerClasseEstOuvert(false);
              }}
              rafraichir={() => {
                fetchClasses();
              }}
            />
          </div>
        </div>

        <table className="table table-hover mt-5">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Groupe</th>
              <th>Cours</th>
              <th>Professeur</th>
              <th>Etat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesFiltrees.map((classe) => (
              <tr key={classe.id_classe}>
                <td>{classe.code_cours}</td>
                <td>{classe.description}</td>
                <td>{classe.groupe}</td>
                <td>{classe.cours_id_cours}</td>
                <td>{classe.professeur_id_professeur}</td>
                <td>{classe.etat_classe}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      setModalModifierEstOuvert(true);
                      setDonnesModal(classe);
                      console.log(donneesModal);
                    }}
                  >
                    {ModifierSVG()}
                  </button>
                  <ModalModifierClasse
                    open={modalModifierEstOuvert}
                    classe={donneesModal}
                    estFermee={() => setModalModifierEstOuvert(false)}
                    rafraichir={fetchClasses}
                  />
                  <button
                    className="btn"
                    onClick={() => desactiverClasse(classe.id_classe)}
                  >
                    {SupprimerSVG()}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Classe;
