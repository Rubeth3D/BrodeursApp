import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
//image SVG
import ActiviteSVG from "../../image/ActiviteSVG";
import ClassesSVG from "../../image/ClassesSVG";
import CoursSVG from "../../image/CoursSVG";
import EquipeSVG from "../../image/EquipesSVG";
import ResultatsSVG from "../../image/ResultatsSVG";
import AdminSVG from "../../image/AdminSVG";
import DeconnexionSVG from "../../image/DeconnexionSVG";
import CompteSVG from "../../image/CompteSVG";
import TravauxSVG from "../../image/TravauxSVG";
import CommentaireSVG from "../../image/CommentaireSVG";
import ProfesseurSVG from "../../image/ProfesseurSVG.jsx";
import EtudiantSVG from "../../image/EtudiantSVG.jsx";
//element
import HoverDiv from "../../element/HoverDiv";
import Classe from "../../element/classe";
import Cours from "../../element/Cours";
import Admin from "../../element/admin/admin.jsx";
import Equipe from "../../element/Equipe";
import Commentaire from "../../element/Commentaire";
import ModalDeconnexion from "../../element/modalDeconnexion";
import CreationCompte from "../../element/CreationCompte.jsx";

function DashBoard() {
  const [modalDeconnexionOpen, setModalDeconnexionOpen] = useState(false);
  const [id_utilisateur, setIdUtilisateur] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [courriel, setCourriel] = useState("");
  const [nummeroDa, setNumeroDa] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("");
  const [insitutionEnseignement, setInsitutionEnseignement] = useState(
    "College de Bois de boulogne"
  );
  const navigate = useNavigate();

  const [etatBoutton, setEtatBoutton] = useState([
    { id: "Dashboard", isActiver: false },
    { id: "Cours", isActiver: false },
    { id: "Classes", isActiver: true },
    { id: "Equipes", isActiver: false },
    { id: "Critère", isActiver: false },
    { id: "Travaux", isActiver: false },
    { id: "Resultats", isActiver: false },
    { id: "Inscription", isActiver: false },
    { id: "Commentaire", isActiver: false },
    { id: "Admin", isActiver: false },
  ]);

  const handleModalOpen = () => {
    setModalDeconnexionOpen(true);
  };

  const handleModalClose = () => {
    setModalDeconnexionOpen(false);
  };

  const deconnexion = async () => {
    try {
      const response = await fetch("http://localhost:8080/inscription/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Déconnecté avec succès");
        navigate("/");
      } else {
        console.error("Erreur de déconnexion");
      }
    } catch (err) {
      console.error("Erreur serveur :", err);
    }
  };

  const fetchUtilisateur = async () => {
    try {
      const response = await fetch("http://localhost:8080/utilisateur", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Erreur de récupération :", data);
      } else {
        console.log("l'utilisateur as bien récupéré");
        setNom(data[0].nom);
        setPrenom(data[0].prenom);
        setNomUtilisateur(data[0].nom_utilisateur);
        setCourriel(data[0].courriel);
        setIdUtilisateur(data[0].id_utilisateur);
        const types = {
          E: "Étudiant",
          P: "Professeur",
          A: "Admin",
        };
        setTypeUtilisateur(types[data[0].type_utilisateur] || "Inconnu");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Cliquer = (id) => {
    const updatedState = etatBoutton.map((button) => {
      if (button.id === id) {
        return { ...button, isActiver: true };
      }
      return { ...button, isActiver: false };
    });

    setEtatBoutton(updatedState);
  };

  useEffect(() => {
    fetchUtilisateur();
  }, []);

  return (
    <>
      <div className="navbar navbar-dark bg-primary sticky-top text-bg-primary p-2">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand text-white mx-5">
            Évaluation par les pairs
          </Link>
          <div className="nav-item d-flex align-items-center">
            <h2 className="me-5 mb-0 fs-4 fw-light align-content-center">
              {nomUtilisateur}
            </h2>
            <div className="me-5 fw-light btn align-content-center border-0 ">
              <ul className="navbar-nav">
                <li className="nav-item dropdown-center">
                  <button
                    className="btn p-0 border-0 text-light"
                    id="dropdownUtilisateurBouton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <CompteSVG></CompteSVG>
                  </button>
                  <ul
                    className="dropdown-menu py-0 border-0"
                    aria-labelledby="dropdownUtilisateurBouton"
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "2rem",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="card" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <h2 className="card-title fs-5 fw-normal">
                          {prenom} {nom}
                        </h2>
                        <h2 className="card-subtitle fs-5 mb-2 text-muted fw-light">
                          {typeUtilisateur}
                        </h2>
                        <div className="align-content-end mt-1">
                          <p className="card-text m-0 fs-6">{courriel}</p>
                          <p className="card-text m-0 fs-6">{nummeroDa}</p>
                          <p className="card-text m-0 fs-6">
                            {insitutionEnseignement}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
            <button
              className="btn me-5 fw-light btn align-content-center border-0 text-light"
              onClick={handleModalOpen}
            >
              <DeconnexionSVG />
            </button>
          </div>
        </div>
        <ModalDeconnexion
          open={modalDeconnexionOpen}
          estFermee={handleModalClose}
          deconnexion={deconnexion}
        />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-2 bg-light" style={{ height: "100vh" }}>
            <div className="justify-content-start mt-5">
              <HoverDiv
                text={"Cours"}
                svgImage={<CoursSVG />}
                isCliquer={etatBoutton[1].isActiver}
                onclick={() => {
                  Cliquer("Cours");
                }}
              ></HoverDiv>

              <HoverDiv
                text={"Classes"}
                svgImage={<ClassesSVG />}
                isCliquer={etatBoutton[2].isActiver}
                onclick={() => {
                  Cliquer("Classes");
                }}
              ></HoverDiv>

              <HoverDiv
                text={"Equipes"}
                svgImage={<EquipeSVG />}
                isCliquer={etatBoutton[3].isActiver}
                onclick={() => {
                  Cliquer("Equipes");
                }}
              ></HoverDiv>

              {(typeUtilisateur == "Professeur" ||
                typeUtilisateur == "Admin") && (
                <HoverDiv
                  text={"Critère"}
                  svgImage={<ActiviteSVG />}
                  isCliquer={etatBoutton[4].isActiver}
                  onclick={() => {
                    Cliquer("Critère");
                  }}
                ></HoverDiv>
              )}

              {(typeUtilisateur == "Professeur" ||
                typeUtilisateur == "Admin") && (
                <HoverDiv
                  text={"Travaux"}
                  svgImage={<TravauxSVG />}
                  isCliquer={etatBoutton[5].isActiver}
                  onclick={() => {
                    Cliquer("Travaux");
                  }}
                ></HoverDiv>
              )}

              <HoverDiv
                text={"Résultats"}
                svgImage={<ResultatsSVG />}
                isCliquer={etatBoutton[6].isActiver}
                onclick={() => {
                  Cliquer("Resultats");
                }}
              ></HoverDiv>

              {(typeUtilisateur === "Admin" ||
                typeUtilisateur === "Professeur") && (
                <HoverDiv
                  text={"Inscription"}
                  svgImage={<EtudiantSVG />}
                  isCliquer={etatBoutton[7].isActiver}
                  onclick={() => {
                    Cliquer("Inscription");
                  }}
                ></HoverDiv>
              )}

              <HoverDiv
                text={"Commentaire"}
                svgImage={<CommentaireSVG />}
                isCliquer={etatBoutton[8].isActiver}
                onclick={() => {
                  Cliquer("Commentaire");
                }}
              ></HoverDiv>

              {typeUtilisateur == "Admin" && (
                <HoverDiv
                  text={"Admin"}
                  svgImage={<AdminSVG />}
                  isCliquer={etatBoutton[9].isActiver}
                  onclick={() => {
                    Cliquer("Admin");
                  }}
                ></HoverDiv>
              )}
            </div>
          </div>
          <div className="col-9 mt-5">
            {etatBoutton[1].isActiver && <Cours />}
            {etatBoutton[2].isActiver && (
              <Classe type_utilisateur={typeUtilisateur} />
            )}
            {etatBoutton[3].isActiver && <Equipe />}
            {etatBoutton[7].isActiver && (
              <CreationCompte type_utilisateur={typeUtilisateur} />
            )}
            {etatBoutton[8].isActiver && (
              <Commentaire
                id_utilisateur={id_utilisateur}
                nom_utilisateur={nomUtilisateur}
                type_utilisateur={typeUtilisateur}
              />
            )}
            {etatBoutton[9].isActiver && <Admin />}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
