import React from "react";
import bootstrap from "bootstrap";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

function Classe() {
    return(
        <>
        <Navbar/>
        <div className="container mt-5">
            <div className="mt-3">
                <input type="text" className="form-control fs-5" />
            </div>

        </div>
        </>
    ); 
}

export default Classe;