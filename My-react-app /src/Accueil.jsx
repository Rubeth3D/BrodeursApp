import "bootstrap/dist/css/bootstrap.min.css";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";

function Accueil() {
    const annee = new Date().getFullYear(); // Source : https://www.w3schools.com/js/js_date_methods.asp
    return (
        <div style={{ backgroundColor: "#F5F6F7" , width: "100%", height: "100%"}}>
            <nav style={{ backgroundColor: "#343A40", color: "white", padding: "10px", display: "flex", justifyContent: "space-between"}}>
                <span className="fw-bold mt-2"> Évaluation par les pairs</span> {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                <div className="mt-2">
                    <a href="#" className="text-white mx-1">Accueil</a>
                    <a href="#" className="text-white mx-1">Cours</a>
                    <a href="#" className="text-white mx-1">Connexion</a>
                </div>
            </nav>

           
            <div className="container text-center mt-5">   {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                <h1>Évaluation par les pairs</h1>
                <p>Gestion des travaux, des équipes et évaluations par les pairs</p>
            </div>

            <div className="border mx-auto mt-5 rounded" style={{ width: "60%", padding: "30px", backgroundColor: "white"}}> {/* Source : ChatGpt pour centrer /*/}
                <h5 className="text-center">À propos de notre plateforme</h5><br></br>
                <p className="text-justify">Cette plateforme permet aux étudiants d’évaluer leurs membres d’équipe lors d’un travail { /* Source : https://getbootstrap.com/docs/4.0/utilities/text/ */}
                    d’équipe. Grâce à cette évaluation, cela permet aux étudiants d’améliorer leurs apprentissages et la réflexion 
                    critique.
                </p>
            </div>

            <div className="d-flex justify-content-around mt-5"> {/* Source : https://getbootstrap.com/docs/5.0/utilities/flex/ */}
                <div className="border mx-auto mt-3 rounded"  style={{ margin: "5%", width: "30%", padding: "20px", backgroundColor: "white"}}>   {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                    <h5 className="container text-center">Évaluation</h5>
                    <p className="container text-center">L’équipe évalue chacun de ses membres.</p>
                </div>
                <div className="border mx-auto mt-3 rounded"  style={{ margin: "5%", width: "30%", padding: "20px", backgroundColor: "white"}}>   {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                    <h5 className="container text-center">Rétroaction</h5>
                    <p className="container text-center">Commentaires par l’étudiant</p>
                </div>
                <div className="border mx-auto mt-3 rounded"  style={{ margin: "5%", width: "30%", padding: "20px", backgroundColor: "white"}}>   {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                    <h5 className="container text-center">Qualité</h5>
                    <p className="container text-center">Progression du l’apprentissage des étudiants</p>
                </div>
            </div>

            <div className="border mx-auto mt-3 rounded" style={{ width: "50%", padding: "20px", backgroundColor: "white"}}>
                <h5 className="text-center">FAQ - Question</h5><br></br>
                <div className="accordion" id="faqAccordion"> {/* Source : https://getbootstrap.com/docs/5.0/components/accordion/ */}
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Comment évaluation par les pairs fonctionne ?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne">
                            <div className="accordion-body, text-justify, mt-3, mx-3"> 
                                Chaque étudiant évalue les membres de son équipe selon les critères donnés par l’enseignant,
                                ce qui permet aux étudiants d’analyser la performance du travail d’équipe. 
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