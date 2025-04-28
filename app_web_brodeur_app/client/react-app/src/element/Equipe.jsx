import React, { useState, useEffect } from "react";
import SupprimerSVG from "../image/SupprimerSVG.jsx";
import ModifierSVG from "../image/ModifierSVG.jsx";

const Equipe = () => {
  const [filtreTousEquipes, setFiltreTousEquipes] = useState([]);
  const [equipe, setEquipe] = useState([]);
  const [form, setForm] = useState({
    code_equipe: "",
    nom: "",
  });

  const fetchEquipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/equipe", {
        method:"GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setEquipe(data);
      setFiltreTousEquipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const creerEquipe = async (e) => {
    e.preventDefault();
    try{
      const equipeActif = {
        ...form,
        etat_equipe: "Actif",
      };
      const response = await fetch("http://localhost:8080/equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(equipeActif),
      });
      if(response.ok){
        fetchEquipes();
      }
    }catch (error) {
      console.error("Erreur lors de la création de l'équipe:", error);
    }
  };

  const modifierEquipe = async(id) => {
    try{
      const response = await fetch(`http://localhost:8080/equipe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if(response.ok){
        fetchEquipes();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const desactiverEquipe = async (equipe) => {
    try{
      await fetch(`http://localhost:8080/equipe/${equipe.code_equipe}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...equipe, etat_equipe: "Inactif" }),
      });

      fetchEquipes();
    } catch (error) {
      console.error("Erreur lors de la désactivation de l'équipe:", error);
    }
  }

  const viderForm = () => {
    setForm({
      code_equipe: "",
      nom: "",
    });
  };

  useEffect(() => {
    fetchEquipes();
  }, []);


  const equipeActif = equipe.filter((equipe) => equipe.etat_equipe === "Actif");
  const equipeInactif = equipe.filter((equipe) => equipe.etat_equipe === "Inactif");
  const totalEquipe = equipe.length;

  return (
    <>
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes total:</h2>
                <p className="card-text fs-4 text-primary mt-4">{totalEquipe}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes Actif:</h2>
                <p className="card-text fs-4 text-success mt-4">{equipeActif.length}</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title"> Nombre d'équipes Inactif:</h2>
                <p className="card-text fs-4 text-danger mt-4">{equipeInactif.length}</p>
              </div>
            </div>
        </div>
        
        </div>
      </div>
    </>
  );









}

export default Equipe;
