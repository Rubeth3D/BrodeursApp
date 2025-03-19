import React, { useState } from "react";

const AjouterCours = () => {
  const url = "http://localhost:8080/cours";
  const [session, setSession] = useState([]);
  const [sessionSelected, setSessionSelect] = useState("");
  const [cours, nouveauCours] = useState({
    code_cours: "",
    description_cours: "",
    etat_cours: "A",
  });
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
      const reponse = await fetch(`${url}`, {
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
  const gererChangement = (e) => {
    const { name, value } = e.target;
    setCoursMisAJour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="container col-3">
        <h2 className="text-center">Ajouter un nouveau cours</h2>
        <form onSubmit={(e) => PostCours(e, cours, sessionSelected)}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">
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
              <span className="input-group-text" id="inputGroup-sizing-default">
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
export default AjouterCours;
