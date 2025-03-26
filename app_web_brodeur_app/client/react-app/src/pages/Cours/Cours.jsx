import React, { useState, useEffect } from "react";
import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";

const Cours = () => {
    const [cours, setCours] = useState([]);
    const [form, setForm] = useState({
        code_cours: "",
        description_cours: "",
        etat_cours: "",
        session_id_session: "",
    });


const fetchCours = async () => {
    try {
        const response = await fetch("http://localhost:8080/cours", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setCours(data);
    } catch (error) {
        console.error(error);
    }
};

const creerCours = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8080/cours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

const modifierCours = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/cours/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

const supprimerCours = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/cours/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            fetchCours();
        }
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    fetchCours();
}, []);

return (
    <>
    <Navbar/>

    <Footer/>
    </>
);
};

export default Cours;
