import React, { useState, useEffect, useRef } from "react";

const AjouterClasse = () => {
    const urlClasse = "http://localhost:8080/classe";
    const urlCours = "http://localhost:8080/cours";
    const estFetchedCours = useRef(false);
    const [cours, setCours] = useState([]);
    const [coursSelected, setCoursSelect] = useState("");
    const [classe, nouvelleClasse] = useState({
        description : "",
        session : "",
        groupe : "",
        etat_classes : "A",
    });

    const GetCours = async () => {
        try {
            const reponse = await fetch(urlCours);
            const objetCours = await reponse.json();
            setCours(objetCours);
        } catch (err) {
            console.log(`Erreur lors du fetch des cours : ${err}`);
        }
    };

    const PostClasse = async (e, classe, cours) => {
        e.preventDefault();
        try {
            console.log(classe);
            const data = {
                description : classe.description,
                session : classe.session,
                groupe : classe.groupe,
                etat_classes : classe.etat_classes,
                cours_id_cours : cours,
            };
            console.log(data);
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

    const modifierClasse = (e) => {
        const {name,value} = e.target;
        setCoursMisAJour((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (!estFetchedCours.current) {
            GetCours();
            estFetchedCours.current = false;
        }
    }, []);

    return (
    <>
    <div className="container col-3">
        <h1 className="text-center">Ajouter une nouvelle Classe</h1>
        <form onSubmit={(e) => PostClasse(e, classe, coursSelected)}>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        Description
                    </span>
                </div>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={modifierClasse}
                    value={classe.description}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="selectbox" className="form-label">
                    Selectionner le cours
                </label>
                <div className="position-relative">
                <select
                    className="form-select"
                    id="selectbox"
                    onChange={(e) => setCoursSelect(e.target.value)}
             >
                    <option value="">Selectionner un cours</option>
                    {cours.map((cours) => (
                        <option key={cours.id_cours} value={cours.id_cours}>
                            {cours.code_cours}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Ajouter
            </button>
        </form>
    </div>
    </>
    );
};

export default AjouterClasse;