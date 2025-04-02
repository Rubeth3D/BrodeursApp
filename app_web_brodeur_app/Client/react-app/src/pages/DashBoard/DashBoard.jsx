import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
//image SVG
import ActiviteSVG from "../../image/ActiviteSVG";
import ClassesSVG from "../../image/ClassesSVG";
import CoursSVG from "../../image/CoursSVG";
import DashBoardSVG from "../../image/DashboardSVG";
import EquipeSVG from "../../image/EquipesSVG";
import ResultatsSVG from "../../image/ResultatsSVG";
import AdminSVG from "../../image/AdminSVG";
import DeconnexionSVG from "../../image/DeconnexionSVG";
import CompteSVG from "../../image/CompteSVG";
//element
import HoverDiv from "../../element/HoverDiv";
import HoverText from "../../element/HoverText";
import Classe from "../../element/classe";
import Cours from "../../element/Cours";
import TravauxSVG from "../../image/TravauxSVG";

function DashBoard() {
  const [etatBoutton, setEtatBoutton] = useState([
    { id: "Dashboard", isActiver: false },
    { id: "Cours", isActiver: false },
    { id: "Classes", isActiver: true },
    { id: "Equipes", isActiver: false },
    { id: "Critère", isActiver: false },
    { id: "Travaux", isActiver: false },
    { id: "Resultats", isActiver: false },
    { id: "Admin", isActiver: false },
  ]);

  const Cliquer = (id) => {
    const updatedState = etatBoutton.map((button) => {
      if (button.id === id) {
        return { ...button, isActiver: true };
      }
      return { ...button, isActiver: false };
    });

    setEtatBoutton(updatedState);
  };

  return (
    <>
      <div className="navbar ms-3 me-5 mt-5">
        <div className="container-fluid">
          <h2 className="navbar-brand text-primary fs-2 fw-normal">
            Évaluation par les pairs
          </h2>
          <div className="nav-item d-flex align-items-center">
            <h2 className="me-5 mb-0 fs-4 fw-light align-content-center">
              Sévastien Céleste
            </h2>
            <div className="me-5 fw-light btn align-content-center border-0">
              <ul className="navbar-nav">
                <li className="nav-item dropdown-center">
                  <button
                    className="btn p-0 border-0"
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
                          Sévastien Céleste
                        </h2>
                        <h2 className="card-subtitle fs-5 mb-2 text-muted fw-light">
                          étudiant
                        </h2>
                        <div className="align-content-end mt-1">
                          <p className="card-text m-0 fs-6">
                            2244552@bdeb.qc.ca
                          </p>
                          <p className="card-text m-0 fs-6">2244552</p>
                          <p className="card-text m-0 fs-6">
                            College de Bois-de-boulogne
                          </p>
                        </div>
                      </div>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="me-5 fw-light btn align-content-center border-0">
              <HoverText text={<DeconnexionSVG />} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-2 ms-0 d-flex justify-content-start">
            <div
              className="justify-content-start mt-5 mx-3 col-6"
              style={{ width: "12rem" }}
            >
              <HoverDiv
                text={"Dashboard"}
                svgImage={<DashBoardSVG />}
                isCliquer={etatBoutton[0].isActiver}
                onclick={() => {
                  Cliquer("Dashboard");
                }}
              ></HoverDiv>

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

              <HoverDiv
                text={"Critère"}
                svgImage={<ActiviteSVG />}
                isCliquer={etatBoutton[4].isActiver}
                onclick={() => {
                  Cliquer("Critère");
                }}
              ></HoverDiv>
              <HoverDiv
                text={"Travaux"}
                svgImage={<TravauxSVG />}
                isCliquer={etatBoutton[5].isActiver}
                onclick={() => {
                  Cliquer("Travaux");
                }}
              ></HoverDiv>

              <HoverDiv
                text={"Résultats"}
                svgImage={<ResultatsSVG />}
                isCliquer={etatBoutton[6].isActiver}
                onclick={() => {
                  Cliquer("Resultats");
                }}
              ></HoverDiv>

              <HoverDiv
                text={"Admin"}
                svgImage={<AdminSVG />}
                isCliquer={etatBoutton[7].isActiver}
                onclick={() => {
                  Cliquer("Admin");
                }}
              ></HoverDiv>
            </div>
          </div>
          <div className="col-9">
            {etatBoutton[1].isActiver && <Cours />}
            {etatBoutton[2].isActiver && <Classe />}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
