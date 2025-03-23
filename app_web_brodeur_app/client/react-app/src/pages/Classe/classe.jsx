import React, { useState, useEffect } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

const Classe = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    code_cours: "",
    description: "",
    groupe: "",
    cours_id_cours: "",
    professeur_id_professeur: "",
    etat_classe: "",
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

  const creerClasse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/classe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const modifierClasse = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/classe/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        fetchClasses();
      }
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

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center">Liste des classes</h1>
      </div>
      <div className="container mt-5">
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher une classe"
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-5 mx-5">
        <button type="button" className="btn btn-primary">
          + Ajouter une classe
        </button>
      </div>

      <Footer />
    </>
  );
};

export default Classe;
