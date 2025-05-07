import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
//@ts-ignore
import MessageUtilisateur from "../../element/MessageUtilisateur.jsx";
function Connexion() {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [codeReponseServeur, setCodeReponseServeur] = useState(null);
  const [reponseMessage, setReponseMessage] = useState(null);
  const navigate = useNavigate();

  const connexionUser = async (e) => {
    e.preventDefault();

    if (!nomUtilisateur) {
      console.error("Nom d'utilisateur requis");
      return;
    } else if (!motDePasse) {
      console.error("Mot de passe requis");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_utilisateur: nomUtilisateur,
          mot_de_passe_Utilisateur: motDePasse,
        }),
      });

      setCodeReponseServeur(response.status);

      const rawBody = await response.text();

      let dataJson;
      try {
        dataJson = JSON.parse(rawBody);
      } catch (e) {
        console.error("Réponse non-JSON du serveur :", rawBody);
        setReponseMessage("Réponse serveur invalide");
        return;
      }

      // Affiche le message dans tous les cas
      setReponseMessage(dataJson.message || "Connexion réussie");

      // Redirection si succès
      if (response.status === 200) {
        navigate("/DashBoard", {
          state: { nom_utilisateur: dataJson.nom_user },
        });
      }
    } catch (err) {
      console.error("Erreur de serveur :", err.message);
      setCodeReponseServeur(500);
      setReponseMessage("Erreur de communication avec le serveur");
    }
  };

  return (
    <>
      <form className="container" onSubmit={connexionUser}>
        <Link to={"/"}>
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
          reponseCodeStatus={codeReponseServeur}
          reponseMessage={reponseMessage}
        ></MessageUtilisateur>
        <h2 className="text-center display-3 fw-normal">Connexion</h2>
        <div className="row justify-content-center mt-5">
          <div className="col-4">
            <div className="form-group mb-5">
              <label className="fw-bold fs-4">Nom d'utilisateur</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Entrer votre nom d'utilisateur"
                  id="inputNumeroIdentification"
                  value={nomUtilisateur}
                  onChange={(e) => setNomUtilisateur(e.target.value)}
                  name="nom_utilisateur"
                  required
                />
              </div>
              <div id="validationServer03Feedback" class="invalid-feedback" />
            </div>
            <div className="form-group">
              <label className="fw-bold fs-4">Mot de passe</label>
              <input
                type="password"
                className="form-control form-control-lg "
                placeholder="Entrer votre mot de passe"
                id="inputMotDePasse"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                name="mot_de_passe_Utilisateur"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary fs-3 mb-1">
            Connexion
          </button>
          <p>
            <Link
              to={"/Inscription"}
              className="link-dark link-opacity-75-hover link-underline-light link-underline-opacity-0-hover fs-5"
            >
              Inscription
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Connexion;
