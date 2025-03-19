import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  var titre;
  function GererLeTitre() {
    if (
      location.pathname !== "/Etudiant" &&
      location.pathname !== "/Enseignant"
    ) {
      return (
        <Link to={"/"} className="navbar-brand text-white mx-5">
          Évaluation par les pairs
        </Link>
      );
    }
    return <div>eille le twit</div>;
  }
  // const url = "http://localhost/8080/utilisateur/";
  // const GetUtilisateur = async () => {
  //   try {
  //     const reponse = await fetch(url);
  //   } catch (err) {}
  // };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary sticky-top justify-content-between">
      {GererLeTitre()}
      <ul className="navbar-nav mx-5">
        <li className="nav-item dropdown">
          <button
            className="btn btn-primary dropdown-toggle mx-5"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="25"
              fill="currentColor"
              className="fs-5"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <Link to={"/Connexion"} className="dropdown-item">
                Connexion
              </Link>
            </li>
            <div className="dropdown-divider"></div>
            <li>
              <Link to={"/Connexion/CreateAccount"} className="dropdown-item">
                Inscription
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
