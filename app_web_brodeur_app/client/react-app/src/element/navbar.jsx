import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
function Navbar() {
  function GererConnexion() {
    const location = useLocation();
    if (location.pathname === "/DashBoard") {
      const username = location.state.username;
      return (
        <li>
          <Link to={"/DashBoard"} className="dropdown-item">
            {username}
          </Link>
        </li>
      );
    }
    return (
      <li>
        <Link to={"/Connexion"} className="dropdown-item">
          Connexion
        </Link>
      </li>
    );
  }
  function GererInscription() {
    const location = useLocation();
    console.log();
    if (location.pathname === "/DashBoard") {
      return (
        <li>
          <Link to={"/DashBoard"} className="dropdown-item">
            Se deconnecter
          </Link>
        </li>
      );
    }
    return (
      <li>
        <Link to={"/Connexion"} className="dropdown-item">
          S'inscrire
        </Link>
      </li>
    );
  }
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
              height="30"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>{GererConnexion()}</li>
            <li>{GererInscription()}</li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
