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

    const modifierEquipe = (e) => {
        const {name,value} = e.target;
        setEquipeMisAJour((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!estFetchedClasse.current) {
            GetClasse();
            estFetchedClasse.current = true;
        }
    }, []);

    return(
        <>
        
        </>
    )
};

export default Equipe;