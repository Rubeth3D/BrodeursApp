import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";
import ModalModifierClasse from "./ModalModifierClasse.jsx";
import ModalCreerClasse from "./ModalCreerClasse.jsx";
import { use } from "react";

const Admin = () => {
  const navigate = useNavigate();
  //A modifier
  const [donneesModal, setDonnesModal] = useState(null);
  const EtatDesactiverClasse = "Inactive";
  const [requete, setRequete] = useState(null);
  const [classes, setClasses] = useState([]);
  const [modalModifierEstOuvert, setModalModifierEstOuvert] = useState(false);
  const [modalCreerClasseEstOuvert, setModalCreerClasseEstOuvert] =
    useState(false);

  //Eux ajouter
  const [nombreEtudiant, setNombreEtudiant] = useState(0);
  const [nombreProfesseur, setNombreProfesseur] = useState(0);
  const [nombreComentaire, setNombreCommentaire] = useState(0);

  const fetchUtilisateur = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/utilisateur", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await reponse.json();
      if (reponse.status == 200) {
      } else if (reponse.status == 401) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  function GererCompteursAdmin() {}

  useEffect(() => {
    GererCompteursAdmin();
  }, []);

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre d'étudiant totaux:</h2>
                <p className="card-text fs-4 text-primary mt-4">
                  {nombreEtudiant}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5">
                  Nombre de professeur totaux:
                </h2>
                <p className="card-text fs-4 text-success mt-4">
                  {nombreProfesseur}
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5">Nombre de commentaire:</h2>
                <p className="card-text fs-4 text-danger mt-4">
                  {nombreComentaire}
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

        <table className="table table-hover mt-5 text-center">
          <thead>
            <tr>
              <th className="text-center">Code</th>
              <th className="text-center">Description</th>
              <th className="text-center">Groupe</th>
              <th className="text-center">Cours</th>
              <th className="text-center">État</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
