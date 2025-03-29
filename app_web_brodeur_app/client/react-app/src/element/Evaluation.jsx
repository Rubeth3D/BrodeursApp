import e from "express";
import React, { useState, useEffect, useRef } from "react";

const Evaluation = () => {
    const urlEvaluation = "http://localhost:8080/evaluation";
    const urlClasse = "http://localhost:8080/classe";
    const estFetchedClasse = useRef(false);
    const [classe, setClasse] = useState([]);
    const [classeSelected, setClasseSelect] = useState("");
    const [evaluation,nouvelleEvaluation] = useState({
        date_evaluation: "",
        code_evaluation : "",
        description: "",
        etat_evaluation: "A",
    });

    const getClasse = async () => {
        try {
            const reponse = await fetch(urlClasse);
            const objetClasse = await reponse.json();
            setClasse(objetClasse);
        } catch (err) {
            console.log(`Erreur lors du fetch des classes : ${err}`);
        }
    };

    useEffect(() => {
        if (!estFetchedClasse.current) {
            getClasse();
            estFetchedClasse.current = true;
        }
    }, []);

    const postEvaluation = async (e, evaluation, classe) => {
        e.preventDefault();
        try{
           console.log(evaluation);
              const data = {
                date_evaluation: evaluation.date_evaluation,
                code_evaluation: evaluation.code_evaluation,
                description: evaluation.description,
                etat_evaluation: evaluation.etat_evaluation,
                classe_id_classe: classe,
            };
            console.log(data);
            const reponse = await fetch(`${urlEvaluation}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'evaluation");
            }
            window.location.reload();
            console.log("Evaluation insere avec succes");
        } catch (err) {
            console.log(`Erreur lors de l'insertion de l'evaluation ${err}`);
        }
    }

    const putEvaluation = async (evaluation) => {
        try {
            const data = {
                date_evaluation: evaluation.date_evaluation,
                code_evaluation: evaluation.code_evaluation,
                description: evaluation.description,
                etat_evaluation: evaluation.etat_evaluation,
            };
            const reponse = await fetch(`${urlEvaluation}/${evaluation.id_evaluation}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'evaluation");
            }
            window.location.reload();
            console.log("Evaluation mis a jour avec succes");
        } catch (err) {
            console.log(`Erreur lors de la mise a jour de l'evaluation ${err}`);
        }
    };

    const deleteEvaluation = async (evaluation) => {
        try {
            const reponse = await fetch(`${urlEvaluation}/${evaluation.id_evaluation}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la suppression de l'evaluation");
            }
            window.location.reload();
            console.log("Evaluation supprime avec succes");
        } catch (err) {
            console.log(`Erreur lors de la suppression de l'evaluation ${err}`);
        }
    }

    return (
        <div className="container">

            <h1>Ajouter Evaluation</h1>

            <form
                onSubmit={(e) => {
                    postEvaluation(e, evaluation, classeSelected);
                }}
            >
                <div className="form-group">
                    <label htmlFor="code_evaluation">Code Evaluation</label>
                    <input
                        type="text"
                        className="form-control"
                        id="code_evaluation"
                        name="code_evaluation"
                        value={evaluation.code_evaluation}
                        onChange={(e) => {
                            nouvelleEvaluation((prev) => ({
                                ...prev,
                                code_evaluation: e.target.value,
                            }));
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={evaluation.description}
                        onChange={(e) => {
                            nouvelleEvaluation((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }));
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date_evaluation">Date Evaluation</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date_evaluation"
                        name="date_evaluation"
                        value={evaluation.date_evaluation}
                        onChange={(e) => {
                            nouvelleEvaluation((prev) => ({
                                ...prev,
                                date_evaluation: e.target.value,
                            }));
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="etat_evaluation">Etat Evaluation</label>
                    <select
                        className="form-control"
                        id="etat_evaluation"
                        name="etat_evaluation"
                        value={evaluation.etat_evaluation}
                        onChange={(e) => {
                            nouvelleEvaluation((prev) => ({
                                ...prev,
                                etat_evaluation: e.target.value,
                            }));
                        }}
                    >
                        <option value="">Select Etat</option>
                        <option value="A">Actif</option>
                        <option value="I">Inactif</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="classe_id_classe">Classe</label>
                    <
                        select
                        className="form-control"
                        id="classe_id_classe"
                        name="classe_id_classe"
                        value={classeSelected}
                        onChange={(e) => {
                            setClasseSelect(e.target.value);
                        }}
                    >
                        {classe.map((item) => (
                            <option key={item.id_classe} value={item.id_classe}>
                                {item.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Ajouter Evaluation
                </button>

            </form>
            <div className="mt-5">
                <h2>Liste des Evaluations</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code Evaluation</th>
                            <th scope="col">Description</th>
                            <th scope="col">Date Evaluation</th>
                            <th scope="col">Etat Evaluation</th>
                            <th scope="col">Classe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classe.map((item) => (
                            <tr key={item.id_classe}>
                                <td>{item.code_evaluation}</td>
                                <td>{item.description}</td>
                                <td>{item.date_evaluation}</td>
                                <td>{item.etat_evaluation}</td>
                                <td>{item.classe_id_classe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <h2>Modifier/Supprimer une Evaluation</h2>
                <form
                    onSubmit={(e) => {
                        putEvaluation(evaluation);
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="code_evaluation">Code Evaluation</label>
                        <input
                            type="text"
                            className="form-control"
                            id="code_evaluation"
                            name="code_evaluation"
                            value={evaluation.code_evaluation}
                            onChange={(e) => {
                                nouvelleEvaluation((prev) => ({
                                    ...prev,
                                    code_evaluation: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Modifier Evaluation
                    </button>
                </form>
                
                <button
                    className="btn btn-danger mt-3"
                    onClick={() => deleteEvaluation(evaluation)}
                >
                    Supprimer Evaluation
                </button>
            </div>
        </div>
    );
}
export default Evaluation;