import "bootstrap/dist/css/bootstrap.min.css";

function Accueil() {
    return (
        <div style={{ backgroundColor: "#F5F6F7" , width: "100vw", height: "100vh"}}>
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

            <div className="border mx-auto mt-5 rounded" style={{ width: "50%", padding: "20px", backgroundColor: "white"}}>
                <h5 className="text-center">À propos de notre plateforme</h5><br></br>
                <p className="text-justify">Cette plateforme permet aux étudiants d’évaluer leurs membres d’équipe lors d’un travail { /* Source : https://getbootstrap.com/docs/4.0/utilities/text/ */}
                    d’équipe. Grâce à cette évaluation, cela permet aux étudiants d’améliorer leurs apprentissages et la réflexion 
                    critique.
                </p>
            
            </div>
        </div>

    );
}

export default Accueil;