import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";
import ModalModifierClasse from "./ModalModifierClasse.jsx";
import ModalCreerClasse from "./ModalCreerClasse.jsx";
import ModalTables from "./admin/ModalTable.jsx";

const Classe = ({ type_utilisateur }) => {
  const navigate = useNavigate();
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

    // Filtrage de base : classes actives
    const classesActives = classes;

    // Si pas de requête, retourner toutes les classes actives
    if (!requete) {
      return classesActives;
    }

    // Si requête, filtrer en plus sur le code du cours
    return classesActives.filter((classe) =>
      classe.code_cours.toLowerCase().includes(requete.toLowerCase())
    );
  }, [requete, classes]);

  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        setClasses(data);
      } else if (response.status === 401) {
        console.error(data.message);
        navigate("/connexion");
      }
    } catch (err) {
      console.error("Erreur au niveau du fetch des classes : ", err);
    }
  };

  //Fais la function delete un cours pour l'utilisateur, mais pas pour un admin
  //admin peut encore voir la classes
  const desactiverClasse = async (id) => {
    try {
      console.log("Classe a modifier : ", EtatDesactiverClasse);
      console.log(id);
      const response = await fetch(
        `http://localhost:8080/classe/desactiverClasse/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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
      if (classe.etat_classe === "Actif") {
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
    if (type_utilisateur) {
      console.log("Type utilisateur dans Classe :", type_utilisateur);
      fetchClasses();
    }
  }, [type_utilisateur]);

  useEffect(() => {
    if (classes.length > 0) {
      GererCompteursClasses(classes);
    }
  }, [classes]);

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes totaux:</h2>
                <p className="card-text fs-4 text-primary mt-4">
                  {compteurClasse}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes actives:</h2>
                <p className="card-text fs-4 text-success mt-4">
                  {compteurClasseActive}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5">
                  Nombre de classes inactives:
                </h2>
                <p className="card-text fs-4 text-danger mt-4">
                  {compteurClasseInactive}
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center mb-5 mt-2">Tableau des classes</h1>
        <div className="container my-4">
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
                    + Ajouter
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
              type_utilisateur={type_utilisateur}
            />
          </div>
        </div>

        <table className="table table-hover mt-5 text-center">
          <thead>
            <tr>
              <th className="text-center">Code</th>
              <th className="text-center">Description</th>
              <th className="text-center">Groupe</th>
              <th className="text-center">Professeur</th>
              <th className="text-center">Etat</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesFiltrees.map((classe) => (
              <tr key={classe.id_classe}>
                <td className="text-center align-middle py-3">
                  {classe.code_cours}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.description}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.groupe}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.nom_professeur}
                </td>

                <td className="text-center align-middle py-3">
                  {classe.etat_classe}
                </td>
                <td className="text-center align-middle py-3">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => {
                        setModalModifierEstOuvert(true);
                        setDonnesModal(classe);
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
                      className="btn btn-sm"
                      onClick={() => desactiverClasse(classe.id_classe)}
                    >
                      {SupprimerSVG()}
                    </button>
                  </div>
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
