import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

const Cours = () => {
    const [cours, setCours] = useState([]);
    const [form, setForm] = useState({
        code_cours: "",
        description_cours: "",
        etat_cours: "",
        session_id_session: "",
    });

const fetchCours = async () => {
    try {
        const response = await fetch("http://localhost:8080/cours", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setCours(data);
    } catch (error) {
        console.error(error);
    }
};

const creerCours = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8080/cours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

const modifierCours = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/cours/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

const supprimerCours = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/cours/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    fetchCours();
}, []);

return (
    <>
    <div className="container mt-5">
        <h1 className="text-center">Liste des cours</h1>
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un cours"
            onChange={(e) => {                                                    // Aider par ChatGPT pour la recherche de classe
              const searchTerm = e.target.value.toLowerCase();
                setCours((prevCours) =>
                prevCours.filter((cours) =>
                  cours.description_cours.toLowerCase().includes(searchTerm)
                )
              );
            }}
          />
        </div>

        <div className="d-flex justify-content-end mt-3">
            <button 
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#creerCours"
            >
                + Ajouter un cours
            </button>
        </div>

        <table className="table table-striped table-hover mt-4">
            <thead>
                <tr>
                    <th>Code</th>
                    <th>Description</th>
                    <th>Etat</th>
                    <th>Session</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cours.map((cours) => (
                    <tr key={cours.id_cours}>
                        <td>{cours.code_cours}</td>
                        <td>{cours.description_cours}</td>
                        <td>{cours.etat_cours}</td>
                        <td>{cours.session_id_session}</td>
                        <td>
                            <button
                            type="button"
                            className="btn btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modifierCours"
                            onClick={() => setForm(cours)}
                            >
                                Modifier
                            </button>
                            <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => supprimerCours(cours.id_cours)}
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    <div
        className="modal fade"
        id="creerCours"
        tabIndex="-1"
        aria-labelledby="creerCoursLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="creerCoursLabel">
                        Ajouter un cours
                    </h5>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                <form onSubmit={creerCours}>
                {[
                    { label: "Code cours", id: "code_cours" },
                    { label: "Nom cours", id: "description_cours" },
                    { label: "Etat Classe", id: "etat_classe" },
                    { label: "Session", id: "session_id_session" },
                ].map(({ label, id }) => (
                  <div className="mb-3" key={id}>
                    <label htmlFor={id} className="form-label">
                      {label}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id={id}
                      value={form[id]}
                      onChange={(e) =>
                        setForm({ ...form, [id]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </form>
                </div>
            </div>
        </div>
    </div>
    </>
);
};

export default Cours;
