import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Connexion() {
  const [numeroIdentification, setNumeroIdentification] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const ConnexionUser = async (id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/utilisateur/${id}`);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className=" mb-5"></div>
      <form className="container">
        <h2 className="text-center display-3 fw-normal">Connexion</h2>
        <div className="row justify-content-center mt-5">
          <div className="col-4">
            <div className="form-group mb-5">
              <label className="fw-bold fs-4">Numéro d'identification</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Entrer Numéro d'identification"
                  id="inputNumeroIdentification"
                  value={numeroIdentification}
                  onChange={(e) => setNumeroIdentification(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="fw-bold fs-4">Mot de passe</label>
              <input
                type="password"
                className="form-control form-control-lg "
                placeholder="Entrer Mot de passe"
                id="inputMotDePasse"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button
            className="btn btn-primary fs-3 mb-1"
            onClick={() => ConnexionUser(numeroIdentification)}
          >
            Connecter
          </button>
          <p>
            <Link
              to={"/Connexion/CreateAccount"}
              className="link-dark link-opacity-75-hover link-underline-light link-underline-opacity-0-hover fs-5"
            >
              Inscription
            </Link>
          </p>
        </div>
      </form>
      <Footer></Footer>
    </>
  );
}

export default Connexion;
