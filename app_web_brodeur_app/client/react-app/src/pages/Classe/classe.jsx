import React, { use, useState, useEffect } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

function Classe() {
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:8080/classe");
      const data = await response.json();
      console.log(data);
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
          {" "}
          + Ajouter une classe
        </button>
      </div>
      
      <Footer />
    </>
  );
}

export default Classe;
