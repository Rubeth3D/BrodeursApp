import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
//@ts-ignore
import MessageErreurConnexion from "../../element/MessageConnexion.jsx";
import Navbar from "../../element/Navbar.jsx";
import Footer from "../../element/Footer.jsx";
function VerificationCode() {
  const classNamesZoneCode = "border m-2 p-1 rounded mt-3";
  const [inputCode, setInputCode] = useState([null, null, null, null]);
  const compteurMinutes = 10;
  const compteurTemps = useRef(compteurMinutes * 60);
  const [timer, setTimer] = useState("");
  const styleZoneCode = {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    margin: "0 8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const classNameBorderZoneCode =
    "border position-absolute top-50 start-50 translate-middle p-5 rounded m-2";
  const classNameEntrerCode = "p-5";
  const gererInputCode = (e) => {
    console.log(e.target.name);
    if (!e) {
      return;
    }
    let value = e.target.value;
    if (e.target.value.length > 1) {
      value = value.charAt(0);
    }
    e.target.value = value;
    setInputCode([...inputCode, { [e.target.name]: e.target.value }]);
  };
  const compteurCode = () => {
    const minutes = Math.floor(compteurTemps.current / 60);
    let secondes = compteurTemps.current % 60;
    let minutesString = `${minutes}`;
    let secondesString = `${secondes}`;
    if (minutes < 10) {
      minutesString = `0${minutes}`;
    }
    if (secondes < 10) {
      secondesString = `0${secondes}`;
    }
    console.log("Timer : ", minutesString, secondesString);
    compteurTemps.current--;
    setTimer(`${minutesString} : ${secondesString}`);
    console.log("Timer : ", timer);
  };
  const envoyerCode = async () =>{
    const resultat = await fetch("http://localhost:8080/inscription/envoyerCode",
      {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify("")
      }
  )
  }
    const creationUtilisateur = async (e) => {
      e.preventDefault();
      try {
        console.log(
          "Informations du formulaire : ",
          bodyUtilisateur.nom,
          bodyUtilisateur.prenom,
          bodyUtilisateur.nom_utilisateur,
          bodyUtilisateur.courriel
        );
        if (
          bodyUtilisateur.nom === "" ||
          bodyUtilisateur.prenom === "" ||
          bodyUtilisateur.courriel === ""
        ) {
          console.log("Il manque des informations au formulaire");
          return;
        }
  
        if (bodyUtilisateur.mot_de_passe !== mot_de_passe_confirmation) {
          console.log("Les deux mots de passe ne sont pas identiques");
          return;
        }
  
        console.log("Body utilisateur : ", bodyUtilisateur);
        const response = await fetch(`http://localhost:8080/inscription`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyUtilisateur),
          credentials: "include",
        });
  
        if (response.ok) {
          console.log(bodyUtilisateur.mot_de_passe);
          console.log(bodyUtilisateur.nom_utilisateur);
          const responseConnexion = await fetch(`http://localhost:8080/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              nom_utilisateur: bodyUtilisateur.nom_utilisateur,
              mot_de_passe_Utilisateur: bodyUtilisateur.mot_de_passe,
            }),
          });
          if (responseConnexion.ok) {
            navigate("/DashBoard", {
              state: { username: `${bodyUtilisateur.nom_utilisateur}` },
            });
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    };
  useEffect(() => {
    envoyerCode()
    const intervaleCompteur = setInterval(compteurCode, 1000);
    return () => clearInterval(intervaleCompteur);
  }, []);
  return (
    <>
      <Navbar />
      <div className={classNameBorderZoneCode}>
        <div className="text-center">
          <h2 className={classNameEntrerCode}>
            Veuillez entrer votre code de verification
          </h2>
          <p className="">Celui ci expirera dans {timer}</p>
        </div>

        <div className="text-center">
          <input
            style={styleZoneCode}
            name="index0"
            type="text"
            className={classNamesZoneCode}
            onChange={(e) => {
              gererInputCode(e);
            }}
          />
          <input
            style={styleZoneCode}
            name="index1"
            type="text"
            className={classNamesZoneCode}
            onChange={(e) => {
              gererInputCode(e);
            }}
          />
          <input
            style={styleZoneCode}
            name="index2"
            type="text"
            className={classNamesZoneCode}
            onChange={(e) => {
              gererInputCode(e);
            }}
          />
          <input
            style={styleZoneCode}
            name="index3"
            type="text"
            className={classNamesZoneCode}
            onChange={(e) => {
              gererInputCode(e);
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VerificationCode;
