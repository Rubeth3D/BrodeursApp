import React, { useState, useEffect,useRef } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";
import ModalModifierClasse from "./ModalModifierClasse.jsx";
import ModalCreerClasse from "./ModalCreerClasse.jsx";
const classe = () => {
  const [donneesModal,setDonnesModal] = useState(null)
  const [classes, setClasses] = useState([]);
  console.log("Render")
  const [modalModifierEstOuvert, setModalModifierEstOuvert] = useState(false);
   const[modalCreerClasseEstOuvert,setModalCreerClasseEstOuvert] = useState(false);
  const [classeSelectionnee, setClasseSelectionnee] = useState([]);
  //Ya des placeholders
  const [nouvelleClasse, setNouvelleClasse] = useState({
    code_cours: "",
    description: "",
    groupe: "1",
    professeur_id_professeur: "1",
    cours_id_cours: "1",
    etat_classe: "A",
  });
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };



  const supprimerClasse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/classe/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

 
  

  const NouvelleClasseSetData = (e) => {
    setNouvelleClasse({
      ...nouvelleClasse,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    console.log("Fetch de la classe");
    fetchClasses();
  }, []);



  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe total:</h2>
                <p className="card-text fs-4 text-primary mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe actif:</h2>
                <p className="card-text fs-4 text-success mt-4">0</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classe inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">0</p>
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
                  placeholder="Rechercher une classe"
                  // onChange={(e) => {
                  //   const searchTerm = e.target.value.toLowerCase();
                  //   fetchClasses();
                  //   setClasses((prevClasses) =>
                  //     prevClasses.filter((classe) =>
                  //       classe.description.toLowerCase().includes(searchTerm)
                  //     )
                  //   );
                  // }}
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
                    onClick={() => {setModalCreerClasseEstOuvert(true)}}
                  >
                    + Ajouter une classe
                  </button>
                </div>
              </div>
            </div>
            <ModalCreerClasse
            open={modalCreerClasseEstOuvert}
            estFermee={() =>{
              setModalCreerClasseEstOuvert()
            }}
            rafraichir={() => {fetchClasses()}}
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
            { classes.map((classe) => (
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
          setDonnesModal(classe)
          console.log(donneesModal.current);
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
        onClick={() => supprimerClasse(classe.id_classe)}
      >
        {SupprimerSVG()}
      </button>
    </td>
  </tr>
)) 
}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default classe;