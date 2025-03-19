import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Connexion() {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const connexionUser = async (nomUser, motDePasse, e) => {
    e.preventDefault();
    if (!nomUser) {
      console.error("Nom d'utilisateur requis");
      return;
    } else if (!motDePasse) {
      console.error("Mot de passe requis");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/utilisateur/${nomUser}/${motDePasse}`
      );
      const dataJson = await response.json();
      if (response.status == 200) {
        console.log(dataJson.message);
        navigate("/cours");
      } else if (response.status == 404) {
        console.log(dataJson.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className=" mb-5"></div>
      <form
        className="container"
        onSubmit={(e) => connexionUser(nomUtilisateur, motDePasse, e)}
      >
        <h2 className="text-center display-3 fw-normal">Connexion</h2>
        <div className="row justify-content-center mt-5">
          <div className="col-4">
            <div className="form-group mb-5">
              <label className="fw-bold fs-4">Nom d'utilisateur</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Entrer Nom d'utilisateur"
                  id="inputNumeroIdentification"
                  value={nomUtilisateur}
                  onChange={(e) => setNomUtilisateur(e.target.value)}
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
          <button type="submit" className="btn btn-primary fs-3 mb-1">
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
