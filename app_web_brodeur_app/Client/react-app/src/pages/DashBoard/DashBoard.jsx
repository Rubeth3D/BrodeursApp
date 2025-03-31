import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import HoverText from "../../element/HoverText";
import HoverDiv from "../../element/HoverDiv";
import ActiviteSVG from "../../image/ActiviteSVG";
import Admin from "../../image/AdminSVG";
import AssignationsSVG from "../../image/AssignationsSVG";
import ClassesSVG from "../../image/ClassesSVG";
import CoursSVG from "../../image/CoursSVG";
import DashBoardSVG from "../../image/DashboardSVG";
import EquipeSVG from "../../image/EquipesSVG";
import ResultatsSVG from "../../image/ResultatsSVG";
import AdminSVG from "../../image/AdminSVG";

function DashBoard() {

  const [etatBoutton, setEtatBoutton] = useState([
    {id:"Dashboard", text:"Dashboard", isActiver: false},
    {id:"Cours", text:"Cours", isActiver: false},
    {id:"Classes", text:"Classes", isActiver: false},
    {id:"Equipes", text:"Equipes", isActiver: false},
    {id:"Activité", text:"Activité", isActiver: false},
    {id:"Assignations", text:"Assignations", isActiver: false},
    {id:"Resultats", text:"Resultats", isActiver: false},
    {id:"Admin", text:"Admin", isActiver: false},
  ]);

  const Cliquer = (id) => {
  };

  return (
    <>

    

      <h2 className="text-primary mx-3 mt-5 fw-normal">
        Évaluation par les pairs
      </h2>
      <div
        className="justify-content-start mt-5 mx-3"
        style={{ width: "12rem" }}
      >
        <HoverDiv id="Dashboard" text={"Dashboard"} svgImage={<DashBoardSVG/>} isCliquer={etatBoutton[0].isActiver}></HoverDiv>
        <HoverDiv id="Cours" text={"Cours"} svgImage={<CoursSVG/>} isCliquer={etatBoutton[1].isActiver}></HoverDiv>
        <HoverDiv id="Classes" text={"Classes"} svgImage={<ClassesSVG/>} isCliquer={etatBoutton[2].isActiver}></HoverDiv>
        <HoverDiv id="Equipes" text={"Equipes"} svgImage={<EquipeSVG/>} isCliquer={etatBoutton[3].isActiver}></HoverDiv>
        <HoverDiv id="Activité" text={"Activité"} svgImage={<ActiviteSVG/>} isCliquer={etatBoutton[4].isActiver}></HoverDiv>
        <HoverDiv id="Assignations" text={"Assignations"} svgImage={<AssignationsSVG/>} isCliquer={etatBoutton[5].isActiver}></HoverDiv>
        <HoverDiv id="Resultats" text={"Resultats"} svgImage={<ResultatsSVG/>} isCliquer={etatBoutton[6].isActiver}></HoverDiv>
        <HoverDiv id="Admin" text={"Admin"} svgImage={<AdminSVG/>} isCliquer={etatBoutton[7].isActiver}></HoverDiv>
      </div>
    </>
  );
}

export default DashBoard;
