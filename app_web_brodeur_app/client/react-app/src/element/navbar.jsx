function navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <a href="#" className="navbar-brand mb-0">
        Évaluation par les pairs
      </a>

      <div className="navbar navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Accueil
            </a>
          </li>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Cours
            </a>
          </li>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              Connexion
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default navbar;
