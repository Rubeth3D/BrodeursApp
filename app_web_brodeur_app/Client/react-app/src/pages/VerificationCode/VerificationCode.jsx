import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
//@ts-ignore
import MessageUtilisateur from "../../element/MessageUtilisateur.jsx";
import Navbar from "../../element/Navbar.jsx";
//@ts-ignore
import Footer from "../../element/Footer.jsx";
function VerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const utilisateur = location.state;
  const classNamesZoneCode = "border m-2 p-1 rounded mt-3";
  const [inputIndex0, setInputIndex0] = useState("");
  const [inputIndex1, setInputIndex1] = useState("");
  const [inputIndex2, setInputIndex2] = useState("");
  const [inputIndex3, setInputIndex3] = useState("");
  const inputCode = inputIndex0 + inputIndex1 + inputIndex2 + inputIndex3;
  const codePourServeur = { code: inputCode };
  const focusIndex0 = useRef(null);
  const focusIndex1 = useRef(null);
  const focusIndex2 = useRef(null);
  const focusIndex3 = useRef(null);
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
  const classNameConfirmer = "btn btn-primary mt-4";
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

  const creationUtilisateur = async (e) => {
    try {
      e.preventDefault();
      console.log("Body utilisateur : ");
      const reponseCourriel = await fetch(
        `http://localhost:8080/inscription/VerifierCode/${utilisateur.courriel}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(codePourServeur),
          credentials: "include",
        }
      );
      if (reponseCourriel.ok) {
        const reponseCreationCompte = await fetch(
          `http://localhost:8080/inscription/creationCompte/${utilisateur.courriel}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(utilisateur),
          }
        );

        if (reponseCreationCompte.ok) {
          try {
            console.log(location);
            const response = await fetch("http://localhost:8080/login", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                nom_utilisateur: utilisateur.courriel,
                mot_de_passe_Utilisateur: location.state.mot_de_passe,
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
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  function GererInputPaste(e) {
    const collage = e.nativeEvent.clipboardData.getData("Text");
    console.log("Data du collage : ", collage[0]);
    if (collage.length >= 4) {
      setInputIndex0(collage[0] || "");
      setInputIndex1(collage[1] || "");
      setInputIndex2(collage[2] || "");
      setInputIndex3(collage[3] || "");

      focusIndex3.current.focus();
    }
  }
  function gererInputIndex(e) {
    console.log("Valeur du e : ", e.target.value);

    if (e.target.name === "index0") {
      setInputIndex0(e.target.value);
      if (e.target.value.length > 0) {
        focusIndex1.current.focus();
      }
    } else if (e.target.name === "index1") {
      setInputIndex1(e.target.value);
      if (e.target.value.length > 0) {
        focusIndex2.current.focus();
      } else {
        focusIndex0.current.focus();
      }
    } else if (e.target.name === "index2") {
      setInputIndex2(e.target.value);
      if (e.target.value.length > 0) {
        focusIndex3.current.focus();
      } else {
        focusIndex1.current.focus();
      }
    } else {
      setInputIndex3(e.target.value);
      if (e.target.value.length === 0) {
        focusIndex2.current.focus();
      }
    }
  }

  useEffect(() => {
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
            ref={focusIndex0}
            name="index0"
            type="text"
            maxLength={1}
            className={classNamesZoneCode}
            value={inputIndex0}
            onPaste={(e) => {
              GererInputPaste(e);
            }}
            onChange={(e) => {
              gererInputIndex(e);
            }}
          />
          <input
            ref={focusIndex1}
            style={styleZoneCode}
            name="index1"
            type="text"
            maxLength={1}
            className={classNamesZoneCode}
            value={inputIndex1}
            onPaste={(e) => {
              GererInputPaste(e);
            }}
            onChange={(e) => {
              gererInputIndex(e);
            }}
          />
          <input
            ref={focusIndex2}
            style={styleZoneCode}
            name="index2"
            type="text"
            maxLength={1}
            className={classNamesZoneCode}
            value={inputIndex2}
            onPaste={(e) => {
              GererInputPaste(e);
            }}
            onChange={(e) => {
              gererInputIndex(e);
            }}
          />
          <input
            ref={focusIndex3}
            style={styleZoneCode}
            name="index3"
            type="text"
            maxLength={1}
            className={classNamesZoneCode}
            value={inputIndex3}
            onPaste={(e) => {
              GererInputPaste(e);
            }}
            onChange={(e) => {
              gererInputIndex(e);
            }}
          />
          <br />
          <button
            className={classNameConfirmer}
            onClick={(e) => {
              creationUtilisateur(e);
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VerificationCode;
