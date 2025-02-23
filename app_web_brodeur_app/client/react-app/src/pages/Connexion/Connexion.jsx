import Navbar from "../../element/navbar";
import Footer from "../../element/footer";

function Connexion() {
  return (
    <>
      <Navbar></Navbar>
      <h2 className=" mb-5"></h2>
      <div className="container">
        <h2 className="text-center mt-5 display-3 fw-normal">Connexion</h2>
        <div className="row justify-content-center mt-5">
          <div className="col-4">
            <div className="form-group mb-5">
              <label for="numero" className="fw-bold fs-4">
                Numéro d'identification
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Entrer Numéro d'identification"
                id="inputNumeroIdentification"
              />
            </div>
            <div className="form-group">
              <label for="numero" className="fw-bold fs-4">
                Mot de passe
              </label>
              <input
                type="text"
                className="form-control form-control-lg "
                placeholder="Entrer Mot de passe"
                id="inputMotDePasse"
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button className="btn btn-primary fs-3 mb-1">Connecter</button>
          <p>
            <a
              href="#"
              className="link-dark link-opacity-75-hover link-underline-light link-underline-opacity-0-hover fs-5"
            >
              Inscription
            </a>
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Connexion;
