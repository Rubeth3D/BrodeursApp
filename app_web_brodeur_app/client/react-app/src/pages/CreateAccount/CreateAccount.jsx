import Navbar from "../../element/navbar";
import Footer from "../../element/footer";

function CreateAccount() {
  return (
    <>
      <Navbar></Navbar>
      <h2 className=" mb-5"></h2>
      <div className="container">
        <button className="btn btn-primary m-5">
          <h2 className="text-center fs-6 m-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>{" "}
            Retour
          </h2>
        </button>
        <h2 className="text-center display-3 fw-normal mb-5">Inscription</h2>
        <div className="row justify-content-center">
          <div className="col-4 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Nom</label>
              <input type="text" className="form-control fs-5" />
            </div>
          </div>
          <div className="col-4 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Prénom</label>
              <input type="text" className="form-control fs-5" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">No Identification</label>
              <input type="text" className="form-control fs-5" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 mb-5">
            <div className="form-group">
              <label className="fw-bold fs-4">Mot de passe</label>
              <input type="text" className="form-control fs-5" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="form-group">
              <label className="fw-bold fs-4">
                Confirmation du Mot de passe
              </label>
              <input type="text" className="form-control fs-5" />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-2">
          <div className="row justify-content-center mt-4">
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  id="flexRadioDefault1"
                  defaultChecked
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  Étudiant
                </label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadio"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  Professeur
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center mt-2">
          <button className="btn btn-primary mt-5 mb-5">
            <h2 className="mx-5 fs-4 m-0">S'inscrire</h2>
          </button>
        </div>
        <h2 className="mb-5"></h2>
      </div>
      <Footer></Footer>
    </>
  );
}
export default CreateAccount;
