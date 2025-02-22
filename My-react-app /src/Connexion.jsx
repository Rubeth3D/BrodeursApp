import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"; {/* Source : https://api.reactrouter.com/v7/functions/react_router.Link.html */}

function Connexion() {
    const annee = new Date().getFullYear();
    return (
        <div style={{ backgroundColor: "#F5F6F7", width: "100vw", height: "100vh"}}>
            <nav style={{ backgroundColor: "#343A40", color: "white", padding: "10px", display: "flex",justifyContent: "space-between" }}>
                <span className="fw-bold mt-2">Évaluation par les pairs</span>
                <div className="mt-2">
                    <Link to="/" className="text-white mx-1">Accueil</Link>
                    <Link to="/Cours" className="text-white mx-1">Cours</Link>
                    <Link to="/Connexion" className="text-white mx-1">Connexion</Link>
                </div>
            </nav>

            <div className="container text-center mt-5">
                <h1>Connexion</h1>
                <p>Connectez-vous pour accéder à votre compte</p>
            </div>

            <div className="border mx-auto mt-5 rounded" style={{ width: "30%", padding: "30px", backgroundColor: "white"}}> 
                <form>
                    <div className="mb-3">      {/* Source : https://getbootstrap.com/docs/5.0/forms/form-control */}
                        <label htmlFor="exampleInputNoIdentification" className="form-label">Numéro identification</label>
                        <input type="number" className="form-control" id="NoIdentification"/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/> 
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button> <br/>
                    <div style={{margin: "10px", textAlign: "center"}}>
                        <p>Vous n'avez pas de compte ? <a href="#" className="text-center"> Inscription</a></p>
                    </div>
                </form>
            </div>
            <footer className="text-white text-center mt-5" style={{backgroundColor: "#343A40", padding: "10px", position: "absolute", bottom: "0", width: "100%"}}> 
                &copy; Évaluation par les pairs - {annee} 
            </footer>
        </div>
    );
}

export default Connexion;