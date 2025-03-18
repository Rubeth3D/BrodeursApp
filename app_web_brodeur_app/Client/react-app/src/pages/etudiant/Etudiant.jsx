import Navbar from "../../element/navbar";
import { Link } from "react-router-dom";
import React, { Fragment, useEffect, useState, useRef, fetchData } from "react";
// @ts-ignore
import PopUpModifier from "../../element/PopUpModifier";
function Etudiant() {
  //Ajouter un cours
  const AjouterCours = () => {
    const [session, setSession] = useState([]);
    const [sessionSelected, setSessionSelect] = useState("");
    const [cours, nouveauCours] = useState({
      code_cours: "",
      description_cours: "",
      etat_cours: "A",
    });
    const estFetchedSession = useRef(false);

    const gererChangement = (e) => {
      const { name, value } = e.target;
      nouveauCours((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    //fonction pour get les sessions
    const GetSession = async () => {
      try {
        const reponse = await fetch("http://localhost:8080/session");
        const jsonData = await reponse.json();
        console.log(jsonData);
        setSession(jsonData);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (!estFetchedSession.current) {
        estFetchedSession.current = true;
        GetSession();
      }
    }, []);
    return (
      <>
        <div className="container col-3">
          <h2 className="text-center">Ajouter un nouveau cours</h2>
          <form onSubmit={(e) => PostCours(e, cours, sessionSelected)}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Numéro
                </span>
              </div>
              <input
                type="text"
                name="code_cours"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Nouveau numero"
                value={cours.code_cours}
                onChange={gererChangement}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  Description
                </span>
              </div>
              <input
                type="text"
                name="description_cours"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Nouvelle description"
                value={cours.description_cours}
                onChange={gererChangement}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="selectBox" className="form-label">
                Choisissez une session :
              </label>
              <div className="position-relative">
                <select
                  id="selectBox"
                  className="form-select custom-select"
                  onChange={(e) => setSessionSelect(e.target.value)}
                  value={sessionSelected}
                >
                  <option selected value="">
                    Choose...
                  </option>
                  {session.map((session) => (
                    <option key={session.id_session} value={session.id_session}>
                      {session.code_session}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Sauvegarder
            </button>
          </form>
        </div>
      </>
    );
  };
  //J'ai separe les fonction react des fonctions http pour rendre ca un peu plus clair
  //Update un cours
  const PutCours = async (e, cours) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/cours/${cours.id_cours}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cours),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du cours");
      }
      window.location.reload();
      console.log("Cours mis à jour avec succès !");
    } catch (err) {
      console.error(`Erreur lors du update du cours : ${err}`);
    }
  };

  //Insert un cours
  const PostCours = async (e, cours, session) => {
    e.preventDefault();
    try {
      console.log(cours);
      console.log(session);
      const data = {
        code_cours: cours.code_cours,
        description_cours: cours.description_cours,
        etat_cours: cours.etat_cours,
        session_id_session: session,
      };
      console.log(data);
      const reponse = await fetch(`http://localhost:8080/cours`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!reponse.ok) {
        throw new Error("Erreur lors de la mise a jour du cours");
      }
      window.location.reload();
      console.log("Cours insere avec succes");
    } catch (err) {
      console.log(`Erreur lors de l'insertion du cours ${err}`);
    }
  };
  //delete un cours
  const DeleteCours = async (id_cours) => {
    try {
      const deleteCours = await fetch(
        `http://localhost:8080/cours/${id_cours}`,
        {
          method: "DELETE",
        }
      );
      setCours(cours.filter((cours) => cours.id_cours !== id_cours));
    } catch (err) {
      console.log(`Erreur lors du delete du cours : ${err}`);
    }
  };
  //fonction pour get les cours
  const GetCours = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/cours");
      const jsonData = await reponse.json();
      console.log(jsonData);
      setCours(jsonData);
    } catch (err) {
      console.error(`Erreur lors du fetch des cours : ${err}`);
    }
  };

  useEffect(() => {
    if (!estFetchedCours.current) {
      GetCours();
      estFetchedCours.current = true;
    }
  }, []);

  //main de la page
  return (
    <Fragment>
      <AjouterCours />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Code du cours</th>
            <th scope="col">Description</th>
            <th scope="col">Etat du cours</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cours.map((cours) => (
            <tr key={cours.id_cours}>
              <td>{cours.code_cours}</td>
              <td>{cours.description_cours}</td>
              <td>{cours.etat_cours}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => DeleteCours(cours.id_cours)}
                >
                  delete
                </button>
                <popUpModifier cours={cours} />;
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-5"></h2>
    </Fragment>
  );
}
export default Etudiant;
