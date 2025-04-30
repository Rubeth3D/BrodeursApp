import React, { useState, useEffect } from "react";

const Admin = () => {
  const [bodyClasse, setBodyClasse] = useState({});
  const getClasse = async () => {
    const resultat = await fetch("http://localhost:8080/classe", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const reponseJson = await resultat.json();
    setBodyClasse(reponseJson);
  };
  useEffect(() => {
    getClasse();
    console.log(bodyClasse);
  }, []);
  return (
    <>
      {/* {" "}
      <div className="container mt-2">
        <div className="row mb-2 justify-content-center">
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes totaux:</h2>
                <p className="card-text fs-4 text-primary mt-4"></p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5"> Nombre de classes actives:</h2>
                <p className="card-text fs-4 text-success mt-4"></p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow-sm p-2 mb-2 bg-body rounded">
              <div className="card-body text-center">
                <h2 className="card-title fs-5">
                  Nombre de classes inactives:
                </h2>
                <p className="card-text fs-4 text-danger mt-4"></p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center mb-5 mt-2">Tableau des classes</h1>
        <div className="container my-4">
          <div className="row">
            <div className=" col-xxl-10 col-lg-8 col-sm-6">
              <div className="d-flex m-0">
                <input
                  type="text"
                  className="form-control rounded-2"
                  placeholder="Rechercher une classe par son code de cours..."
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="col-xxl-2 col-lg-4">
              <div className="d-flex m-0">
                <div className="d-flex m-0">
                  <button
                    type="button"
                    className="btn btn-btn btn-outline-success btn-rounded" // source : https://mdbootstrap.com/docs/standard/components/buttons/
                    data-bs-toggle="modal"
                    data-bs-target="#createClassModal"
                    onClick={() => {}}
                  >
                    + Ajouter une classe
                  </button>
                </div>
              </div>
            </div>
            <ModalCreerClasse
              open={modalCreerClasseEstOuvert}
              estFermee={() => {}}
              rafraichir={() => {}}
            />
          </div>
        </div>

        <table className="table table-hover mt-5 text-center">
          <thead>
            <tr>
              <th className="text-center">Code</th>
              <th className="text-center">Description</th>
              <th className="text-center">Groupe</th>
              <th className="text-center">Cours</th>
              <th className="text-center">État</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classesFiltrees.map((classe) => (
              <tr key={classe.id_classe}>
                <td className="text-center align-middle py-3">
                  {classe.code_cours}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.description}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.groupe}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.cours_id_cours}
                </td>
                <td className="text-center align-middle py-3">
                  {classe.etat_classe}
                </td>
                <td className="text-center align-middle py-3">
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-sm" onClick={() => {}}>
                      {ModifierSVG()}
                    </button>

                    <button
                      className="btn btn-sm"
                      onClick={() => desactiverClasse(classe.id_classe)}
                    >
                      {SupprimerSVG()}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Admin;
