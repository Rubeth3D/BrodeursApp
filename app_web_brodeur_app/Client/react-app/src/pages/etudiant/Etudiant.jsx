import Cours from "../../element/Cours";
import React from "react";
import Footer from "../../element/Footer";
import AjouterCours from "../../element/AjouterCours";
function Etudiant() {
  return (
    <>
      <AjouterCours />
      <Cours />
      <Footer />
    </>
  );
}
export default Etudiant;
