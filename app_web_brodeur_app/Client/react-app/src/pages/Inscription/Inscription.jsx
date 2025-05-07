//@ts-ignore
import Navbar from "../../element/Navbar";
//@ts-ignore
import Footer from "../../element/footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MessageUtilisateur from "../../element/MessageUtilisateur.jsx";
function Inscription() {
  const [ReponseMessageUtilisateur, setMessageUtilisateur] = useState("");
  const [reponseCodeStatus, setReponseCodeStatus] = useState(null);
  const [bodyUtilisateur, setBodyUtilisateur] = useState({
    nom: "",
    prenom: "",
    nom_utilisateur: "",
    courriel: "",
    mot_de_passe: "",
    numero_da: "",
    etat_utilisateur: "A",
    type_utilisateur: "",
    professeur_id_professeur: null,
    etudiant_id_etudiant: null,
  });

  const [mot_de_passe_confirmation, setMotDePasseConfirmation] = useState("");
  const [typeUtilisateur, setTypeUtilisateur] = useState("E"); // 'e' ou 'p'

  const navigate = useNavigate();
  async function envoyerCourriel() {
    try {
      console.log("Allo");

      const reponseUtilisateurExiste = await fetch(
        `http://localhost:8080/inscription/VerifierUtilisateur/${bodyUtilisateur.courriel}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            type_utilisateur: bodyUtilisateur.type_utilisateur,
          }),
        }
      );
      console.log("Holla");
      setReponseCodeStatus(reponseUtilisateurExiste.status);
      const reponseJson = await reponseUtilisateurExiste.json();
      setMessageUtilisateur(reponseJson.message);
      if (reponseUtilisateurExiste.ok) {
        console.log("Body utilisateur : ", bodyUtilisateur);
        navigate("/VerificationCode", { state: bodyUtilisateur });
      }
    } catch (err) {
      console.log("Erreur de fetch inscription : ", err);
      setReponseCodeStatus(500);
    }
  }
  const changerTypeUtilisateur = (nom, valeur) => {
    setBodyUtilisateur((bodyUtilisateur) => ({
      ...bodyUtilisateur,
      [nom]: valeur,
    }));
  };
  function CreerNomUtilisateur() {
    const nomUtilisateur = `${bodyUtilisateur.prenom} ${bodyUtilisateur.nom}`;
    console.log(nomUtilisateur);
    setBodyUtilisateur((bodyUtilisateur) => ({
      ...bodyUtilisateur,
      nom_utilisateur: nomUtilisateur,
    }));
  }

  return (
    <>
      <form
        className="container"
        onSubmit={(e) => {
          e.preventDefault();
          envoyerCourriel(e);
          CreerNomUtilisateur();
        }}
      >
        <Link to={"/Connexion"}>
          <button className="btn btn-primary m-5" type="button">
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
        <MessageUtilisateur
          reponseCodeStatus={reponseCodeStatus}
          reponseMessage={ReponseMessageUtilisateur}
        />
        <h2 className="text-center display-3 fw-normal mb-5">Inscription</h2>

        <div className="row justify-content-center">
          <div className="col-4 mb-5">
            <label className="fw-bold fs-4">Nom</label>
            <input
              type="text"
              className="form-control fs-5"
              name="nom"
              onChange={(e) =>
                changerTypeUtilisateur(e.target.name, e.target.value)
              }
              required
            />
          </div>
          <div className="col-4 mb-5">
            <label className="fw-bold fs-4">Prénom</label>
            <input
              type="text"
              className="form-control fs-5"
              name="prenom"
              onChange={(e) =>
                changerTypeUtilisateur(e.target.name, e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <label className="fw-bold fs-4">Courriel</label>
            <input
              type="email"
              className="form-control fs-5"
              name="courriel"
              onChange={(e) =>
                changerTypeUtilisateur(e.target.name, e.target.value)
              }
              required
            />
          </div>
        </div>
        {typeUtilisateur === "E" && (
          <div className="row justify-content-center">
            <div className="col-8 mb-5">
              <label className="fw-bold fs-4">Numero d'admission</label>
              <input
                type="text"
                className="form-control fs-5"
                name="numero_da"
                onChange={(e) =>
                  changerTypeUtilisateur(e.target.name, e.target.value)
                }
                required
              />
            </div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <label className="fw-bold fs-4">Mot de passe</label>
            <input
              type="password"
              className="form-control fs-5"
              name="mot_de_passe"
              onChange={(e) =>
                changerTypeUtilisateur(e.target.name, e.target.value)
              }
              required
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <label className="fw-bold fs-4">Confirmation du mot de passe</label>
            <input
              type="password"
              className="form-control fs-5"
              value={mot_de_passe_confirmation}
              onChange={(e) => setMotDePasseConfirmation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="type_utilisateur"
                id="etudiant"
                value="E"
                checked={typeUtilisateur === "E"}
                onChange={(e) => {
                  setTypeUtilisateur(e.target.value);
                  changerTypeUtilisateur("type_utilisateur", e.target.value);
                }}
                required
              />
              <label className="form-check-label" htmlFor="etudiant">
                Étudiant
              </label>
            </div>
          </div>
          <div className="col-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="type_utilisateur"
                id="professeur"
                value="P"
                checked={typeUtilisateur === "P"}
                onChange={(e) => {
                  setTypeUtilisateur(e.target.value);
                  changerTypeUtilisateur("type_utilisateur", e.target.value);
                }}
                required
              />
              <label className="form-check-label" htmlFor="professeur">
                Professeur
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-4">
          <button type="submit" className="btn btn-primary mt-5 mb-5">
            <h2 className="mx-5 fs-4 m-0">S'inscrire</h2>
          </button>
        </div>
      </form>
    </>
  );
}

export default Inscription;
