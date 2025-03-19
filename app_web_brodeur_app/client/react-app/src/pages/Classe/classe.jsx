import React from "react";
import Navbar from "../../element/Navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

function Classe() {
  return (
    <>
      <Navbar DansLeDashBoard={false} />
      <div className="container mt-5">
        <div className="mt-3">
          <input type="text" className="form-control fs-5" />
        </div>
      </div>
    </>
  );
}

export default Classe;
