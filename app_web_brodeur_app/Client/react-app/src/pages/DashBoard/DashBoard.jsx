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
  return (
    <>
      <h2 className="text-primary mx-3 mt-5 fw-normal">
        Évaluation par les pairs
      </h2>
      <div
        className="justify-content-start mt-5 mx-3"
        style={{ width: "12rem" }}
      >
        <HoverDiv text={"Dashboard"} svgImage={<DashBoardSVG/>}></HoverDiv>
        <HoverDiv text={"Cours"} svgImage={<CoursSVG/>}></HoverDiv>
        <HoverDiv text={"Classes"} svgImage={<ClassesSVG/>}></HoverDiv>
        <HoverDiv text={"Equipes"} svgImage={<EquipeSVG/>}></HoverDiv>
        <HoverDiv text={"Activité"} svgImage={<ActiviteSVG/>}></HoverDiv>
        <HoverDiv text={"Assignations"} svgImage={<AssignationsSVG/>}></HoverDiv>
        <HoverDiv text={"Resultats"} svgImage={<ResultatsSVG/>}></HoverDiv>
        <HoverDiv text={"Admin"} svgImage={<AdminSVG/>}></HoverDiv>
      </div>
    </>
  );
}

export default DashBoard;
