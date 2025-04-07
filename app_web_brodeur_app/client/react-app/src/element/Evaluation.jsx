import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";

const Evaluation = () => {
    const urlEvaluation = "http://localhost:8080/evaluation";
    const urlTravail = "http://localhost:8080/travail";
    const urlEtudiant = "http://localhost:8080/etudiant";
    const urlEtudiant1 = "http://localhost:8080/etudiant/1";
    const urlInstrument = "http://localhost:8080/instrument";
    const urlEquipe = "http://localhost:8080/equipe";
    const urlClasse = "http://localhost:8080/classe";
    const estFetchedEvaluation = useRef(false);
    const estFetchedTravail = useRef(false);
    const estFetchedEtudiant = useRef(false);
    const estFetchedInstrument = useRef(false);
    const estFetchedEquipe = useRef(false);
    const estFetchedClasse = useRef(false);
    const [evaluation, setEvaluation] = useState([]);
    const [travail, setTravail] = useState([]);
    const [etudiant, setEtudiant] = useState([]);
    const [instrument, setInstrument] = useState([]);
    const [equipe, setEquipe] = useState([]);
    const [classe, setClasse] = useState([]);
    const [evaluationSelected, setEvaluationSelect] = useState("");
    const [travailSelected, setTravailSelect] = useState("");
    const [etudiantSelected, setEtudiantSelect] = useState("");
    const [instrumentSelected, setInstrumentSelect] = useState("");
    const [equipeSelected, setEquipeSelect] = useState("");
    const [classeSelected, setClasseSelect] = useState("");
    const [evaluationData, setEvaluationData] = useState({
        travail_id_travail: "",
        etudiant_id_etudiant: "",
        etudiant_id_etudiant1: "",
        date_evaluation: "",
        instrument_id_instrument: "",
        equipe_id_equipe: "",
        code_evaluation: "",
        description: "",
        classe_id_classe: "",
        id_cours: "",
        id_session: "",
        etat_evaluation: "A",
    });

    const getEvaluation = async () => {
        try {
            const reponse = await fetch(urlEvaluation);
            const objetEvaluation = await reponse.json();
            setEvaluation(objetEvaluation);
        } catch (err) {
            console.log(`Erreur lors du fetch des evaluations : ${err}`);
        }
    };

    const getTravail = async () => {
        try {
            const reponse = await fetch(urlTravail);
            const objetTravail = await reponse.json();
            setTravail(objetTravail);
        } catch (err) {
            console.log(`Erreur lors du fetch des travaux : ${err}`);
        }
    };

    const getEtudiant = async () => {
        try {
            const reponse = await fetch(urlEtudiant);
            const objetEtudiant = await reponse.json();
            setEtudiant(objetEtudiant);
        } catch (err) {
            console.log(`Erreur lors du fetch des etudiants : ${err}`);
        }
    };

    const getInstrument = async () => {
        try {
            const reponse = await fetch(urlInstrument);
            const objetInstrument = await reponse.json();
            setInstrument(objetInstrument);
        } catch (err) {
            console.log(`Erreur lors du fetch des instruments : ${err}`);
        }
    };

    const getEquipe = async () => {
        try {
            const reponse = await fetch(urlEquipe);
            const objetEquipe = await reponse.json();
            setEquipe(objetEquipe);
        } catch (err) {
            console.log(`Erreur lors du fetch des equipes : ${err}`);
        }
    };
    
    const getClasse = async () => {
        try {
            const reponse = await fetch(urlClasse);
            const objetClasse = await reponse.json();
            setClasse(objetClasse);
        } catch (err) {
            console.log(`Erreur lors du fetch des classes : ${err}`);
        }
    };
    
    const getEtudiant1 = async () => {
        try {
            const reponse = await fetch(urlEtudiant1);
            const objetEtudiant1 = await reponse.json();
            setEtudiantSelect(objetEtudiant1);
        } catch (err) {
            console.log(`Erreur lors du fetch des etudiants : ${err}`);
        }
    };

    const getEtudiant2 = async () => { 
        try {
            const reponse = await fetch(urlEtudiant1);
            const objetEtudiant2 = await reponse.json();
            setEtudiantSelect(objetEtudiant2);
        } catch (err) {
            console.log(`Erreur lors du fetch des etudiants : ${err}`);
        }
    }

    useEffect(() => {
        if (!estFetchedEvaluation.current) {
            getEvaluation();
            estFetchedEvaluation.current = true;
        }
        if (!estFetchedTravail.current) {
            getTravail();
            estFetchedTravail.current = true;
        }
        if (!estFetchedEtudiant.current) {
            getEtudiant();
            estFetchedEtudiant.current = true;
        }
        if (!estFetchedInstrument.current) {
            getInstrument();
            estFetchedInstrument.current = true;
        }
        if (!estFetchedEquipe.current) {
            getEquipe();
            estFetchedEquipe.current = true;
        }
        if (!estFetchedClasse.current) {
            getClasse();
            estFetchedClasse.current = true;
        }
    }, []);

    const postEvaluation = async (evaluation) => {
        try {
            const reponse = await fetch(urlEvaluation, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(evaluation),
            });
            if (reponse.ok) {
                console.log("Evaluation ajoutée avec succès");
                getEvaluation();
            } else {
                console.log("Erreur lors de l'ajout de l'évaluation");
            }
        } catch (err) {
            console.log(`Erreur lors du fetch des evaluations : ${err}`);
        }
    }
    
    const putEvaluation = async (evaluation) => {
        try {
            const reponse = await fetch(`${urlEvaluation}/${evaluation.code_evaluation}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(evaluation),
            });
            if (reponse.ok) {
                console.log("Evaluation modifiée avec succès");
                getEvaluation();
            } else {
                console.log("Erreur lors de la modification de l'évaluation");
            }
        } catch (err) {
            console.log(`Erreur lors du fetch des evaluations : ${err}`);
        }
    }

    const deleteEvaluation = async (evaluation) => {
        try {
            const reponse = await fetch(`${urlEvaluation}/${evaluation.code_evaluation}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (reponse.ok) {
                console.log("Evaluation supprimée avec succès");
                getEvaluation();
            } else {
                console.log("Erreur lors de la suppression de l'évaluation");
            }
        } catch (err) {
            console.log(`Erreur lors du fetch des evaluations : ${err}`);
        }
    }

    return (
        <>
        <Navbar />
        <div className="container">
            <h1>Gestion des Evaluations</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Code Evaluation</th>
                        <th>Description</th>
                        <th>Date Evaluation</th>
                        <th>Etat Evaluation</th>
                        <th>Travail</th>
                        <th>Etudiant</th>
                        <th>Instrument</th>
                        <th>Equipe</th>
                        <th>Classe</th>
                    </tr>
                </thead>
                <tbody>
                    {evaluation.map((evaluationItem) => (
                        <tr key={evaluationItem.code_evaluation}>
                            <td>{evaluationItem.code_evaluation}</td>
                            <td>{evaluationItem.description}</td>
                            <td>{evaluationItem.date_evaluation}</td>
                            <td>{evaluationItem.etat_evaluation}</td>
                            <td>{evaluationItem.travail_id_travail}</td>
                            <td>{evaluationItem.etudiant_id_etudiant}</td>
                            <td>{evaluationItem.instrument_id_instrument}</td>
                            <td>{evaluationItem.equipe_id_equipe}</td>
                            <td>{evaluationItem.classe_id_classe}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Ajouter une nouvelle évaluation</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                postEvaluation(evaluationData);
            }}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={evaluationData.description} onChange={(e) => setEvaluationData({ ...evaluationData, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date_evaluation" className="form-label">Date Evaluation</label>
                    <input type="date" className="form-control" id="date_evaluation" value={evaluationData.date_evaluation} onChange={(e) => setEvaluationData({ ...evaluationData, date_evaluation: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="etat_evaluation" className="form-label">Etat Evaluation</label>
                    <select className="form-select" id="etat_evaluation" value={evaluationData.etat_evaluation} onChange={(e) => setEvaluationData({ ...evaluationData, etat_evaluation: e.target.value })}>
                        <option value="">Choisir un etat</option>
                        <option value="A">Actif</option>
                        <option value="I">Inactif</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-primary">Ajouter Evaluation</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => putEvaluation(evaluationData)}>Modifier Evaluation</button>
                <button type="button" className="btn btn-danger" onClick={(e) => deleteEvaluation(evaluationData)}>Supprimer Evaluation</button>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default Evaluation;