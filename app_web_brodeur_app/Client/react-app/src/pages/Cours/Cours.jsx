import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import { Link } from "react-router-dom";
import react ,{ useEffect, useState} from "react";
import { Fragment} from "react";

function Cours() {
  // const [dataCours, setDataCours] = useState({
  //   id_cours : "",
  //   code_cours : "",
  //   description_cours : "",
  //   etat_cours : "",
  //   session_id_session : ""
  // });
  // const onSubmitForm = async() => {
  //   try {
  //     const body = {dataCours};
  //     const reponse = ("http://localhost:");
  //   } catch (err) {
  //     console.error(`ERREUR CLIENT COURS FETCH ${err}`);
  //   }
  // }
  const getCours = async () => {
    try {
      const reponse = await fetch("http://localhost:8080/cours");
      const jsonData = await reponse.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getCours();
  })
  return (
    <>
      <Navbar />
            <Fragment>
                <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">Code du cours</th>
                  <th scope="col">Description</th>
                  <th scope="col">Etat du cours</th>
                  <th scope="col">Id de session</th>
                </tr>
              </thead>
              <tbody>
                {/* {<tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>} */}
              </tbody>
            </table>
            </Fragment>
      <Footer />
    </>
  );
}
export default Cours;