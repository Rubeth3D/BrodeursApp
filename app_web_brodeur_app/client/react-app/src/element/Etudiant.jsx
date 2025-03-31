import React, { useState, useEffect, useRef, use } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

const Etudiant = () => {
    const urlEtudiant = "http://localhost:8080/etudiant";
    const urlUtilisateur = "http://localhost:8080/utilisateur";
    const urlProfesseur = "http://localhost:8080/professeur";
    const estFertchedEtudiant = useRef(false);
    const estFetchedUtilisateur = useRef(false);
    const estFetchedProfesseur = useRef(false);
    const [etudiant, setEtudiant] = useState([]);
    const [utilisateur, setUtilisateur] = useState([]);
    const [professeur, setProfesseur] = useState([]);
    const [etudiantSelected, setEtudiantSelect] = useState("");
    const [utilisateurSelected, setUtilisateurSelect] = useState("");
    const [professeurSelected, setProfesseurSelect] = useState("");
    const [etudiantMisAJour, setEtudiantMisAJour] = useState({
        nomComplet: "",
        utilisateur_id_utilisateur: "",
        professeur_id_professeur: "",
        etat_etudiant: "A",
    });

    const getEtudiant = async () => {
        try {
            const reponse = await fetch(urlEtudiant);
            const objetEtudiant = await reponse.json();
            setEtudiant(objetEtudiant);
        } catch (err) {
            console.log(`Erreur lors du fetch des etudiants : ${err}`);
        }
    };
    const getUtilisateur = async () => {
        try {
            const reponse = await fetch(urlUtilisateur);
            const objetUtilisateur = await reponse.json();
            setUtilisateur(objetUtilisateur);
        } catch (err) {
            console.log(`Erreur lors du fetch des utilisateurs : ${err}`);
        }
    };
    const getProfesseur = async () => {
        try {
            const reponse = await fetch(urlProfesseur);
            const objetProfesseur = await reponse.json();
            setProfesseur(objetProfesseur);
        }catch (err) {
            console.log(`Erreur lors du fetch des professeurs : ${err}`);
        }
    }

    useEffect(() => {
        if (!estFertchedEtudiant.current) {
            getEtudiant();
            estFertchedEtudiant.current = true;
        }
        if (!estFetchedUtilisateur.current) {
            getUtilisateur();
            estFetchedUtilisateur.current = true;
        }
        if (!estFetchedProfesseur.current) {
            getProfesseur();
            estFetchedProfesseur.current = true;
        }
    }
    , []);

    const postEtudiant = async (e, etudiant, utilisateur, professeur) => {
        e.preventDefault();
        try {
            console.log(etudiant);
            const data = {
                nomComplet: etudiant.nomComplet,
                utilisateur_id_utilisateur: utilisateur,
                professeur_id_professeur: professeur,
                etat_etudiant: etudiant.etat_etudiant,
            };
            console.log(data);
            const reponse = await fetch(`${urlEtudiant}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'etudiant");
            }
            window.location.reload();
            console.log("Etudiant insere avec succes");
        } catch (err) {
            console.log(`Erreur lors de l'insertion de l'etudiant ${err}`);
        }
    };

    const putEtudiant = async (etudiant) => {
        try {
            const reponse = await fetch(`${urlEtudiant}/${etudiant.nomComplet}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(etudiant),
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la mise a jour de l'etudiant");
            }
        } catch (err) {
            console.log(`Erreur lors de la mise a jour de l'etudiant ${err}`);
        }
    };

    const deleteEtudiant = async (etudiant) => {
        try {
            const reponse = await fetch(`${urlEtudiant}/${etudiant.nomComplet}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!reponse.ok) {
                throw new Error("Erreur lors de la suppression de l'etudiant");
            }
            window.location.reload();
            console.log("Etudiant supprime avec succes");
        } catch (err) {
            console.log(`Erreur lors de la suppression de l'etudiant ${err}`);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="container col-3">
            <h2>Ajouter un etudiant</h2>
            <form onSubmit={(e) => postEtudiant(e, etudiantMisAJour, utilisateurSelected, professeurSelected)}>
                <label htmlFor="nomComplet">Nom Complet</label>
                <input
                    type="text"
                    name="nomComplet"
                    value={etudiantMisAJour.nomComplet}
                    onChange={(e) => setEtudiantMisAJour({ ...etudiantMisAJour, nomComplet: e.target.value })}
                />
                <label htmlFor="utilisateur_id_utilisateur">Utilisateur</label>
                <select
                    name="utilisateur_id_utilisateur"
                    value={utilisateurSelected}
                    onChange={(e) => setUtilisateurSelect(e.target.value)}
                >
                    {utilisateur.map((user) => (
                        <option key={user.id_utilisateur} value={user.id_utilisateur}>
                            {user.nom}
                        </option>
                    ))}
                </select>
                <label htmlFor="professeur_id_professeur">Professeur</label>
                <select
                    name="professeur_id_professeur"
                    value={professeurSelected}
                    onChange={(e) => setProfesseurSelect(e.target.value)}
                >
                    {professeur.map((prof) => (
                        <option key={prof.id_professeur} value={prof.id_professeur}>
                            {prof.nom}
                        </option>
                    ))}
                </select>
                <button type="submit">Ajouter Etudiant</button>
            </form>

            <ul>
                {etudiant.map((etd) => (
                    <li key={etd.nomComplet}>
                        {etd.nomComplet} - {etd.etat_etudiant}
                        <button onClick={() => putEtudiant(etd)}>Modifier</button>
                        <button onClick={() => deleteEtudiant(etd)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            </div>
            <Footer/>
        </>
    );
}

