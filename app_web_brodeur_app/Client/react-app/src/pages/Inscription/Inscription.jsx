//@ts-ignore
import Navbar from "../../element/Navbar";
import Footer from "../../element/footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom_user, setNomUtilisateur] = useState("");
  const [email, setEmail] = useState("");
  const [type_utilisateur, setType_utilisateur] = useState("p");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [mot_de_passe_confirmation, setMotDePasseConfirmation] = useState("");
  const etat_utilisateur = "A";
  const id_professeur = null;
  const id_etudiant = null;
  const navigate = useNavigate();

  const changerTypeUtilisateur = (e) => {
    setType_utilisateur(e.target.value);
  };

  const creationUtilisateur = async (e) => {
    e.preventDefault();
    try {
      const body = {
        nom_user,
        mot_de_passe,
        email,
        type_utilisateur,
        id_professeur,
        id_etudiant,
        etat_utilisateur,
      };
      if (nom == "" || prenom == "" || nom_user == "" || email == "") {
        console.log("Il manque des informations aux formulaire");
        return;
      }
      if (mot_de_passe !== mot_de_passe_confirmation) {
        console.log("Les deux mot de passe ne sont pas identique");
        return;
      }
      const response = await fetch(`http://localhost:8080/utilisateur`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        navigate("/DashBoard", {
          state: { username: `${body.nom_user}` },
        });
        //pop-up pour montrer que l'utilisateur est connecté
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <h2 className=" mb-5"></h2>
      <form className="container" onSubmit={(e) => creationUtilisateur(e)}>
        <Link to={"/Connexion"}>
          <button className="btn btn-primary m-5">
            <h2 className="text-center fs-6 m-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>{" "}
              Retour
            </h2>
          </button>
        </Link>
        <h2 className="text-center display-3 fw-normal mb-5">Inscription</h2>
        <div className="row justify-content-center">
          <div className="col-4 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Nom</label>
              <input
                type="text"
                className="form-control fs-5"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-4 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Prénom</label>
              <input
                type="text"
                className="form-control fs-5"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control fs-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Nom d'utilisateur</label>
              <input
                type="text"
                className="form-control fs-5"
                value={nom_user}
                onChange={(e) => setNomUtilisateur(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Mot de passe</label>
              <input
                type="password"
                className="form-control fs-5"
                value={mot_de_passe}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="form-group">
              <label className="fw-bold fs-4">
                Confirmation du Mot de passe
              </label>
              <input
                type="password"
                className="form-control fs-5"
                value={mot_de_passe_confirmation}
                onChange={(e) => setMotDePasseConfirmation(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <div className="row justify-content-center mt-4">
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  id="flexRadioDefault1"
                  value="e"
                  checked={type_utilisateur === "e"}
                  onChange={changerTypeUtilisateur}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Étudiant
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  id="flexRadioDefault2"
                  value="p"
                  checked={type_utilisateur === "p"}
                  onChange={changerTypeUtilisateur}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Professeur
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-2">
          <button className="btn btn-primary mt-5 mb-5">
            <h2 className="mx-5 fs-4 m-0">S'inscrire</h2>
          </button>
        </div>
        <h2 className="mb-5"></h2>
      </form>
    </>
  );
}
export default Inscription;
