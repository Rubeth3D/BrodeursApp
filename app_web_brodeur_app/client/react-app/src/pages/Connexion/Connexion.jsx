import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Connexion() {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [reponseStatus, setReponseStatus] = useState(null);
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const connexionUser = async (e) => {
    e.preventDefault(); // Empêche l'envoi par défaut du formulaire
  
    // Vérification des champs
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
        credentials: "include", // Permet d'envoyer les cookies pour la session
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom_utilisateur: nomUtilisateur, mot_de_passe_Utilisateur: motDePasse }),
      });
  
      const dataJson = await response.json();
  
      if (response.status === 200) {
        //console.log(dataJson); // Affiche la réponse dans la console
        console.log(dataJson.nom_user);
        navigate("/DashBoard", {
          //passe un objet avec les informations de la personnes pour la prochaine pages
          state: { nom_utilisateur: `${dataJson.nom_user}` },
        });
        console.log(document.cookie);
      } else if (response.status === 404) {
        console.log(dataJson.message);
        setReponseStatus("Utilisateur non trouvé");
      } else if (response.status === 401) {
        console.log(dataJson.message);
        setReponseStatus("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (err) {
      console.log(err.message);
      setReponseStatus("Erreur serveur, veuillez réessayer plus tard");
    }
  };

  return (
    <>
      <div className=" mb-5"></div>

      <form
        className="container"
        onSubmit={connexionUser}
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