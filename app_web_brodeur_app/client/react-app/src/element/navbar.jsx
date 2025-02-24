import {Link} from "react-router-dom";

function navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary sticky-top">
      <div className="container">
        <Link to={"/Home"} className="navbar-brand text-white">
          Évaluation par les pairs
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to={"/Home"}
              className="nav-link active text-white"
              aria-current="page"
            >
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Cours"} className="nav-link active text-white disabled" >
              Cours
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Connexion"}className="nav-link active text-white">
              Connexion
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default navbar;
