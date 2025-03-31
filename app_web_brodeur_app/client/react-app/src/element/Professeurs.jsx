import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";


const Professeurs = ()=>{
    const urlProfesseur = "http://localhost:8080/professeur";
    const urlUtilisateur = "http://localhost:8080/utilisateur";
    const estFetchedUtilisateur = useRef(false);
    const [utilisateur, setUtilisateur] = useState([]);
    const [utilisateurSelected, setUtilisateurSelect] = useState("");
    const [professeur,nouveauProfesseur] = useState({
        nom_complet: "",
        etat_professeur: "A",
    });

    const GetUtilisateur = async () => {
        try{
            const reponse = await fetch(urlUtilisateur);
            const objectUtilisateur = await reponse.json();
            setUtilisateur(objectUtilisateur);
        } catch (err) {
            console.log(`Erreur lors du fetch des utilisateurs : ${err}`);
        }
    }

    useEffect(() => {
        if(!estFetchedUtilisateur.current){
            GetUtilisateur();
            estFetchedUtilisateur.current = true;
        }
    }, []);


    const postProfesseur = async(e, professeur, utilisateur) => {
        e.preventDefault();

        try{
            console.log(professeur);
            const data = {
                nom_complet: professeur.nom_complet,
                etat_professeur: professeur.etat_professeur,
                utilisateur_id_utilisateur: utilisateur,
            };
            console.log(data);
            const reponse = await fetch(`${urlProfesseur}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour du professeur");
            }
            window.location.reload();
            console.log("Professeur insere avec succes");
        } catch (err) {
            console.log(`Erreur lors de l'insertion du professeur ${err}`);
        }
    };

    const putProfesseur = async (professeur) => {
        try {
            const data = {
                nom_complet: professeur.nom_complet,
                etat_professeur: professeur.etat_professeur,
            };
            const reponse = await fetch(`${urlProfesseur}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour du professeur");
            }
            window.location.reload();
            console.log("Professeur mis a jour avec succes");
        } catch (err) {
            console.log(`Erreur lors de la mise a jour du professeur ${err}`);
        }
    }

    return(
        <>
            <Navbar />
            <div className="container">
                <h1>Gestion des professeurs</h1>

                <form className="row g-3" onSubmit={(e) => postProfesseur(e, professeur, utilisateurSelected)}>
                    <div className="mb-3">
                        <label htmlFor="nom_complet" className="form-label">Nom Complet</label>
                        <input type="text" className="form-control" id="nom_complet" name="nom_complet" value={professeur.nom_complet} onChange={(e) => nouveauProfesseur({ ...professeur, nom_complet: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="etat_professeur" className="form-label">Etat Professeur</label>
                        <select className="form-select" id="etat_professeur" name="etat_professeur" value={professeur.etat_professeur} onChange={(e) => nouveauProfesseur({ ...professeur, etat_professeur: e.target.value })}>
                            <option value="A">Actif</option>
                            <option value="I">Inactif</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="utilisateur_id_utilisateur" className="form-label">Utilisateur</label>
                        <select className="form-select" id="utilisateur_id_utilisateur" name="utilisateur_id_utilisateur" value={utilisateurSelected} onChange={(e) => setUtilisateurSelect(e.target.value)}>
                            {utilisateur.map((user) => (
                                <option key={user.id_utilisateur} value={user.id_utilisateur}>{user.nom_utilisateur}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Ajouter Professeur</button>
                    </div>
                </form>
            </div>

            <div className="container mt-5">
                <h2>Liste des professeurs</h2>
                <table className="table">
                    <thread>
                        <tr>
                            <th scope="col">Nom Complet</th>
                            <th scope="col">Etat Professeur</th>
                            <th scope="col">Utilisateur</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thread>
                </table>
            </div>

            <div className="container mt-5">
                <h2>Modifier un professeur</h2>
                {classe.map((item) => (
                    <div key={item.id_professeur} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{item.nom_complet}</h5>
                            <p className="card-text">Etat: {item.etat_professeur}</p>
                            <button className="btn btn-primary" onClick={() => putProfesseur(item)}>Modifier</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    )
};

export default Professeurs;


