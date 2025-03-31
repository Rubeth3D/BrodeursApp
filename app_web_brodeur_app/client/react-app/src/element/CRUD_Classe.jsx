import React, { useState, useEffect, useRef } from "react";

const AjouterClasse = () => {
    const urlClasse = "http://localhost:8080/classe";
    const urlCours = "http://localhost:8080/cours";
    const urlProfesseur = "http://localhost:8080/professeur";
    const urlSession = "http://localhost:8080/session";
    const estFetchedClasse = useRef(false);
    const estFetchedCours = useRef(false);
    const estFetchedProfesseur = useRef(false);
    const estFetchedSession = useRef(false);
    const [classe, setClasse] = useState([]);
    const [cours, setCours] = useState([]);
    const [professeur, setProfesseur] = useState([]);
    const [session, setSession] = useState([]);
    const [classeSelected, setClasseSelect] = useState("");
    const [coursSelected, setCoursSelect] = useState("");
    const [professeurSelected, setProfesseurSelect] = useState("");
    const [sessionSelected, setSessionSelect] = useState("");
    const [classeData, setClasseData] = useState({
        code_cours: "",
        description: "",
        groupe: "",
        etat_classe: "A",
        cours_id_cours: "",
        professeur_id_professeur: "",
        session_id_session: "",
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

    const getCours = async () => {
        try {
            const reponse = await fetch(urlCours);
            const objetCours = await reponse.json();
            setCours(objetCours);
        } catch (err) {
            console.log(`Erreur lors du fetch des cours : ${err}`);
        }
    };

    const GetSession = async () => {
        try {
            const reponse = await fetch(urlSession);
            const objetSession = await reponse.json();
            setSession(objetSession);
        } catch (err) {
            console.log(`Erreur lors du fetch des sessions : ${err}`);
        }
    }

    const getProfesseur = async () => {
        try {
            const reponse = await fetch(urlProfesseur);
            const objetProfesseur = await reponse.json();
            setProfesseur(objetProfesseur);
        } catch(err){
            console.log(`Erreur lors du fetch des professeurs : ${err}`);
        }
    }

    useEffect(() => {
        if (!estFetchedClasse.current) {
            getClasse();
            estFetchedClasse.current = true;
        }
        if (!estFetchedCours.current) {
            getCours();
            estFetchedCours.current = true;
        }
        if (!estFetchedProfesseur.current) {
            getProfesseur();
            estFetchedProfesseur.current = true;
        }
        if (!estFetchedSession.current) {
            GetSession();
            estFetchedSession.current = true;
        }
    }, []);

    const postClasse = async (e, classeData) => {
        e.preventDefault();
        try {
            const data = {
                code_cours: classeData.code_cours,
                description: classeData.description,
                groupe: classeData.groupe,
                etat_classe: classeData.etat_classe,
                cours_id_cours: classeData.cours_id_cours,
                professeur_id_professeur: classeData.professeur_id_professeur,
                session_id_session: classeData.session_id_session,
            };
            const reponse = await fetch(`${urlClasse}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de la classe");
            }
            window.location.reload();
            console.log("Classe insere avec succes");
        } catch (err) {
            console.log(`Erreur lors de l'insertion de la classe ${err}`);
        }
    };

    const putClasse = async (e) => {
        e.preventDefault();
        try {
            const reponse = await fetch(`${urlClasse}/${classeData.code_cours}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(classeData),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de la classe");
            }
            window.location.reload();
            console.log("Classe modifiee avec succes");
        } catch (err) {
            console.log(`Erreur lors de la modification de la classe ${err}`);
        }
    }
    
    const DeleteClasse = async (e) => {
        e.preventDefault();
        try {
            const reponse = await fetch(`${urlClasse}/${classeData.code_cours}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la suppression de la classe");
            }
            window.location.reload();
            console.log("Classe supprimee avec succes");
        } catch (err) {
            console.log(`Erreur lors de la suppression de la classe ${err}`);
        }
    }

    return (
        <>
        <div className="container col-3">
            <h2>Ajouter une nouvelle classe</h2>
            
            <form onSubmit={(e) => postClasse(e, classeData)}>
                <div className="mb-3">
                    <label htmlFor="code_cours" className="form-label">Code Cours</label>
                    <input type="text" className="form-control" id="code_cours" value={classeData.code_cours} onChange={(e) => setClasseData({ ...classeData, code_cours: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={classeData.description} onChange={(e) => setClasseData({ ...classeData, description: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="groupe" className="form-label">Groupe</label>
                    <input type="text" className="form-control" id="groupe" value={classeData.groupe} onChange={(e) => setClasseData({ ...classeData, groupe: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="etat_classe" className="form-label">Etat Classe</label>
                    <select className="form-select" id="etat_classe" value={classeData.etat_classe} onChange={(e) => setClasseData({ ...classeData, etat_classe: e.target.value })}>
                        <option value="">Choisir un etat</option>
                        <option value="A">Actif</option>
                        <option value="I">Inactif</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="cours_id_cours" className="form-label">Cours</label>
                    <select className="form-select" id="cours_id_cours" value={classeData.cours_id_cours} onChange={(e) => setClasseData({ ...classeData, cours_id_cours: e.target.value })}>
                        {cours.map((cours) => (
                            <option key={cours.id_cours} value={cours.id_cours}>{cours.nom}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="professeur_id_professeur" className="form-label">Professeur</label>
                    <select className="form-select" id="professeur_id_professeur" value={classeData.professeur_id_professeur} onChange={(e) => setClasseData({ ...classeData, professeur_id_professeur: e.target.value })}>
                        {professeur.map((prof) => (
                            <option key={prof.id_professeur} value={prof.id_professeur}>{prof.nom}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="session_id_session" className="form-label">Session</label>
                    <select className="form-select" id="session_id_session" value={classeData.session_id_session} onChange={(e) => setClasseData({ ...classeData, session_id_session: e.target.value })}>
                        {session.map((sess) => (
                            <option key={sess.id_session} value={sess.id_session}>{sess.nom}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Ajouter Classe</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => putClasse(e)}>Modifier Classe</button>
                <button type="button" className="btn btn-danger" onClick={(e) => DeleteClasse(e)}>Supprimer Classe</button>  
            </form>
        </div>
        </>
    );
}

export default AjouterClasse;