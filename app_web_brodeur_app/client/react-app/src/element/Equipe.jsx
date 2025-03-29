import e from "express";
import React, { useState, useEffect, useRef } from "react";

const Equipe = () => {
    const urlEquipe = "http://localhost:8080/equipe";
    const urlClasse = "http://localhost:8080/classe";
    const estFetchedClasse = useRef(false);
    const [classe, setClasse] = useState([]);
    const [classeSelected, setClasseSelect] = useState("");
    const [equipe, nouvelleEquipe] = useState({
        code_equipe: "",
        nom: "",
        etat_equipe: "A",
    });

    const GetClasse = async () => {
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
            GetClasse();
            estFetchedClasse.current = true;
        }
    }
    , []);

    const postEquipe = async (e, equipe, classe) => {
        e.preventDefault();
        try{
           console.log(equipe);
              const data = {
                code_equipe: equipe.code_equipe,
                nom: equipe.nom,
                etat_equipe: equipe.etat_equipe,
                classe_id_classe: classe,
            };
            console.log(data);
            const reponse = await fetch(`${urlEquipe}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'equipe");
            }
            window.location.reload();
            console.log("Equipe insere avec succes");
        } catch (err) {
            console.log(`Erreur lors de l'insertion de l'equipe ${err}`);
        }
    };

    const putEquipe = async (equipe) => {
        try {
            const reponse = await fetch(`${urlEquipe}/${equipe.code_equipe}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(equipe),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'equipe");
            }
            window.location.reload();
            console.log("Equipe mis a jour avec succes");
        } catch (err) {
            console.log(`Erreur lors de la mise a jour de l'equipe ${err}`);
        }
    }

    const deleteEquipe = async (equipe) => {
        try {
            const reponse = await fetch(`${urlEquipe}/${equipe.code_equipe}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la suppression de l'equipe");
            }
            window.location.reload();
            console.log("Equipe supprime avec succes");
        } catch (err) {
            console.log(`Erreur lors de la suppression de l'equipe ${err}`);
        }
    }
    return(
        <>
            <div className="container">
                <h1>Gestion des équipes</h1>
                <form onSubmit={(e) => postEquipe(e, equipe, classeSelected)}>
                    <div className="mb-3">
                        <label htmlFor="code_equipe" className="form-label">Code équipe</label>
                        <input type="text" className="form-control" id="code_equipe" value={equipe.code_equipe} onChange={(e) => nouvelleEquipe({ ...equipe, code_equipe: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom équipe</label>
                        <input type="text" className="form-control" id="nom" value={equipe.nom} onChange={(e) => nouvelleEquipe({ ...equipe, nom: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etat_equipe" className="form-label">Etat équipe</label>
                        <select className="form-select" id="etat_equipe" value={equipe.etat_equipe} onChange={(e) => nouvelleEquipe({ ...equipe, etat_equipe: e.target.value })}>
                            <option value="A">Actif</option>
                            <option value="I">Inactif</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="classe_id_classe" className="form-label">Classe</label>
                        <select className="form-select" id="classe_id_classe" value={classeSelected} onChange={(e) => setClasseSelect(e.target.value)}>
                            {classe.map((item) => (
                                <option key={item.id_classe} value={item.id_classe}>{item.nom}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter équipe</button>
                </form>
            </div>

            {/* Affichage des équipes */}
            <div className="container mt-5">
                <h2>Liste des équipes</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Code équipe</th>
                            <th scope="col">Nom équipe</th>
                            <th scope="col">Etat équipe</th>
                            <th scope="col">Classe</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classe.map((item) => (
                            <tr key={item.id_classe}>
                                <td>{item.code_equipe}</td>
                                <td>{item.nom}</td>
                                <td>{item.etat_equipe}</td>
                                <td>{item.classe_id_classe}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="container mt-5">
                <h2>Modifier/Supprimer une équipe</h2>
                {classe.map((item) => (
                    <div key={item.id_classe} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{item.nom}</h5>
                            <button className="btn btn-danger" onClick={() => deleteEquipe(item)}>Supprimer</button>
                            <button className="btn btn-warning" onClick={() => putEquipe(item)}>Modifier</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default Equipe;