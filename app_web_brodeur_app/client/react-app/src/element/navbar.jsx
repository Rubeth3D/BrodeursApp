import { Link } from "react-router-dom";

function navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary sticky-top justify-content-between">
      <Link to={"/"} className="navbar-brand text-white mx-5">
        Évaluation par les pairs
      </Link>
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

export default navbar;
