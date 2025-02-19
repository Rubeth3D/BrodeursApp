import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom"; {/* Source : https://stackoverflow.com/questions/46421496/how-to-use-link-react-router-dom */}

function Accueil() {
    const annee = new Date().getFullYear(); 

    return (
        <div style={{ backgroundColor: "#F5F6F7", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <nav style={{ backgroundColor: "#343A40", color: "white", padding: "10px", display: "flex", justifyContent: "space-between"}}>
                <span className="fw-bold mt-2"> Évaluation par les pairs</span>
                <div className="mt-2">
                    <Link to="/Accueil" className="text-white mx-1">Accueil</Link>
                    <Link to="/Cours" className="text-white mx-1">Cours</Link>
                    <Link to="/Connexion" className="text-white mx-1">Connexion</Link>
                </div>
            </nav>

            <div style={{ flexGrow: 1 }}> 
                <div className="container text-center mt-5">
                    <h1>Évaluation par les pairs</h1>
                    <p>Gestion des travaux, des équipes et évaluations par les pairs</p>
                </div>

                <div className="border mx-auto mt-5 rounded" style={{ width: "60%", padding: "30px", backgroundColor: "white"}}>
                    <h5 className="text-center">À propos de notre plateforme</h5>
                    <p className="text-justify">
                        Cette plateforme permet aux étudiants d’évaluer leurs membres d’équipe lors d’un travail 
                        d’équipe. Grâce à cette évaluation, cela permet aux étudiants d’améliorer leurs apprentissages et la réflexion critique.
                    </p>
                </div>

                <div className="d-flex justify-content-around mt-5">
                    {["Évaluation", "Rétroaction", "Qualité"].map((titre, index) => (
                        <div key={index} className="border mx-auto mt-3 rounded" style={{ width: "30%", padding: "20px", backgroundColor: "white"}}>
                            <h5 className="container text-center">{titre}</h5>
                            <p className="container text-center">
                                {titre === "Évaluation" && "L’équipe évalue chacun de ses membres."}
                                {titre === "Rétroaction" && "Commentaires par l’étudiant."}
                                {titre === "Qualité" && "Progression de l’apprentissage des étudiants."}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="border mx-auto mt-3 rounded" style={{ width: "60%", padding: "20px", backgroundColor: "white"}}>
                    <h5 className="text-center">FAQ</h5>
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Comment l’évaluation par les pairs fonctionne ?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne">
                                <div className="accordion-body text-justify mx-3 mt-3">
                                    <p>Chaque étudiant évalue les membres de son équipe selon les critères donnés par l’enseignant, 
                                        ce qui permet aux étudiants d’analyser la performance du travail d’équipe.</p>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-white text-center mt-5" style={{backgroundColor: "#343A40", padding: "10px"}}> 
                &copy; Évaluation par les pairs - {annee} 
            </footer>
        </div>
    );
}

export default Accueil;
