import React, { useState, useRef, useEffect } from "react";
//@ts-ignore
import Navbar from "../../element/Navbar";
//@ts-ignore
import Footer from "../../element/Footer";
import AjouterCours from "../../element/AjouterCours";

function DashBoard() {
  function cours() {
    const [cours, setCours] = useState([]);
    const url = "http://localhost:8080/cours";
    const GetCours = async () => {
      try {
        const reponse = await fetch(url);
        const jsonData = await reponse.json();
        console.log(jsonData);
        setCours(jsonData);
      } catch (err) {
        console.error(`Erreur lors du fetch des cours : ${err}`);
      }
    };
    const estFetchedCours = useRef(false);
    useEffect(() => {
      if (!estFetchedCours.current) {
        GetCours();
        estFetchedCours.current = true;
        console.log(estFetchedCours.current);
      }
    }, []);
    const DeleteCours = async (id_cours) => {
      try {
        const deleteCours = await fetch(`${url}/${id_cours}`, {
          method: "DELETE",
        });
        setCours(cours.filter((cours) => cours.id_cours !== id_cours));
      } catch (err) {
        console.log(`Erreur lors du delete du cours : ${err}`);
      }
    };
    return (
      <>
        <table className="table">
          <thead className="thead-dark">
            <tr></tr>
          </thead>
          <tbody>
            {cours.map((cours) => (
              <tr key={cours.id_cours}>
                <td>{cours.description_cours}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => DeleteCours(cours.id_cours)}
                  >
                    delete
                  </button>
                  <PopUpModifier cours={cours} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mt-5"></h2>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="">
            <AjouterCours />
          </div>
        </div>
        <div className="row">
          <div className="col 1"> {cours()}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default DashBoard;
