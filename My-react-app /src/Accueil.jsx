import "bootstrap/dist/css/bootstrap.min.css";

function Accueil() {
    return (
        <div style={{ backgroundColor: "#F5F6F7" , width: "100vw", height: "100vh"}}>
            <nav style={{ backgroundColor: "#343A40", color: "white", padding: "10px", display: "flex", justifyContent: "space-between"}}>
                <span className="text-start"><b>Évaluation par les pairs</b></span> {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                <div>
                    <a href="#" className="text-white mx-1">Accueil</a>
                    <a href="#" className="text-white mx-1">Cours</a>
                    <a href="#" className="text-white mx-1">Connexion</a>
                </div>
            </nav>

           
            <div className="container text-center">   {/* Source : https://getbootstrap.com/docs/5.0/utilities/text/*/}
                <h1>Évaluation par les pairs</h1>
            </div>
        </div>
    );
}

export default Accueil;