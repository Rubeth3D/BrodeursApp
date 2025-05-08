import React, { useState } from "react";
import { useEffect } from "react";
import MessageUtilisateur from "./MessageUtilisateur";

const Commentaire = ({ id_utilisateur, nom_utilisateur, type_utilisateur }) => {

  const [codeReponseServeur, setCodeReponseServeur] = useState(null);
  const [reponseMessage, setReponseMessage] = useState(null);
  const [utilisateur, setUtilisateur] = useState({
    id_utilisateur,
    nom_utilisateur,
    type_utilisateur,
    commentaire: "",
  });

  const envoyerCommentaire = async () => {
    try{
      if (utilisateur.commentaire.trim() === "") {
        setCodeReponseServeur(400);
        setReponseMessage("Le commentaire ne peut pas être vide.");
      }else
      {const requetePost = await fetch("http://localhost:8080/commentaire/",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(utilisateur),
      });
      if(requetePost.ok){
        setUtilisateur({ ...utilisateur, commentaire: "" })
        setCodeReponseServeur(requetePost.status);
        setReponseMessage("Commentaire Envoyé. Merci de votre retour!");
      }}
    }catch(err){
      console.error("Erreur pour le post du commentaire : " + err);
      setCodeReponseServeur(500);
      setReponseMessage("Erreur de communication avec le serveur");
    }
  };

  return (
    <><MessageUtilisateur
    reponseCodeStatus={codeReponseServeur}
    reponseMessage={reponseMessage}
  ></MessageUtilisateur>
    <div className="d-flex flex-column align-items-center justify-content-center mt-5">
      <h2 className="fs-2 mb-4">Commentaire des utilisateurs</h2>
      <div className="input-group input-group-lg mb-5" style={{ maxWidth: "500px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Votre commentaire"
          value={utilisateur.commentaire}
          onChange={(e) =>
            setUtilisateur({ ...utilisateur, commentaire: e.target.value })
          }
        />
        <button className="btn btn-primary px-4" type="button" onClick={envoyerCommentaire}>
          Envoyer
        </button>
      </div>

      <div className="card text-center" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <p className="card-text fs-5">
            Cette page vous permet d’envoyer un commentaire ou un avis
            directement au développeur du site Web. Merci pour vos retours !
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Commentaire;
