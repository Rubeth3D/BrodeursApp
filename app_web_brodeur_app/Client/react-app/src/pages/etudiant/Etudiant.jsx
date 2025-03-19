import Cours from "../../element/Cours";
import React from "react";
import Navbar from "../../element/Navbar";
//@ts-ignore
import Footer from "../../element/Footer";
import AjouterCours from "../../element/AjouterCours";
function Etudiant() {
  return (
    <>
      <Navbar DansLeDashBoard={true} />
      <AjouterCours />
      <Cours />
      <Footer />
    </>
  );
}
export default Etudiant;
