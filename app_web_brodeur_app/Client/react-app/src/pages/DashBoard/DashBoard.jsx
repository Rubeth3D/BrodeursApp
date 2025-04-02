import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import HoverDiv from "../../element/HoverDiv";
import ActiviteSVG from "../../image/ActiviteSVG";
import AssignationsSVG from "../../image/AssignationsSVG";
import ClassesSVG from "../../image/ClassesSVG";
import CoursSVG from "../../image/CoursSVG";
import DashBoardSVG from "../../image/DashboardSVG";
import EquipeSVG from "../../image/EquipesSVG";
import ResultatsSVG from "../../image/ResultatsSVG";
import AdminSVG from "../../image/AdminSVG";
import Classe from "../../element/classe";
import Cours from "../../element/Cours";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";

function DashBoard() {
  const [etatBoutton, setEtatBoutton] = useState([
    { id: "Dashboard", isActiver: false },
    { id: "Cours", isActiver: false },
    { id: "Classes", isActiver: false },
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
      <h2 className="text-primary mx-3 mt-5 fw-normal">
        Évaluation par les pairs
      </h2>
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
                svgImage={<AssignationsSVG />}
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
          <div className="col-10">
            {etatBoutton[1].isActiver && <Cours />}
            {etatBoutton[2].isActiver && <Classe />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashBoard;
