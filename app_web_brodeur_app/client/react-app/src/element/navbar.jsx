function navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-primary sticky-top">
      <div className="container">
        <a href="#" className="navbar-brand text-white">
          Évaluation par les pairs
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              href=""
              className="nav-link active text-white"
              aria-current="page"
            >
              Accueil
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link active text-white">
              Cours
            </a>
          </li>
          <li className="nav-item">
            <a href="" className="nav-link active text-white">
              Connexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default navbar;
