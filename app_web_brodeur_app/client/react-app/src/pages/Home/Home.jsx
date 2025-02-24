import Navbar from "./../../element/navbar.jsx";
import Footer from "./../../element/footer.jsx";

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="mt5 mb-5"></div>
      <div className="container">
        <h2 className="text-center display-2 fw-normal text-wrap text-dark">
          Évaluation par les pairs
        </h2>
        <h2 className="text-center mb-5 fs-4 fw-light text-wrap">
          Gestion des travaux, des équipes et évaluations par les pairs
        </h2>

        <div className="row align-items-center justify-content-center">
          <div className="col-10 col-lg-12 col-xl-9 mb-4 mt-5">
            <div className="card">
              <div className="card-body text-center">
                <h2 className="card-tittle mb-4 mt-3 fw-normal">
                  À propos de notre plateforme
                </h2>
                <p className="card-text text-wrap mb-4">
                  Cette plateforme permet à chaque étudiant d'évaluer ses
                  membres d'équipe lorsqu'ils effectuent un travail d'équipe.
                  Grâce à cette évaluation, les étudiants peuvent s'améliorer et
                  aprofondir leurs connaissances et la réflexion critique.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-5 align-item-center justify-content-center">
          <div className="col-10 col-lg-4 col-xl-3 g-3 g-xl-4">
            <div className="card h-100 ">
              <div className="card-body text-center py-4">
                <h2 className="card-title fw-normal mb-3">Évaluation</h2>
                <p className="card-text mx-5 text-wrap">
                  L'équipe évalue chacun de ses membres
                </p>
              </div>
            </div>
          </div>

          <div className="col-10 col-lg-4 col-xl-3 g-3 g-md-2 g-xl-4">
            <div className="card h-100 ">
              <div className="card-body text-center py-4">
                <h2 className="card-title fw-normal mb-3">Rétroaction</h2>
                <p className="card-text mx-5 text-wrap">
                  Commentaires par l'étudiants.
                </p>
              </div>
            </div>
          </div>

          <div className="col-10 col-lg-4 col-xl-3 g-3 g-md-2 g-xl-4">
            <div className="card h-100 ">
              <div className="card-body text-center py-4">
                <h2 className="card-title fw-normal mb-3">Qualité</h2>
                <p className="card-text mx-5 text-wrap">
                  Progression de l'apprentisage des étudiants.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-10 col-lg-12 col-xl-9 mb-4 mt-5">
            <div className="card mb-5">
              <div className="card-body text-center">
                <h2 className="card-header mb-4 mt-3 fw-normal display-6">
                  FAQ - Questions
                </h2>
                <p className="card-tittle mb-4 fw-normal fw-lighter fs-3">
                  Comment les évaluations par les pairs fonctionne ?
                </p>

                <p className="card-text text-wrap mb-4 fw-lighter ">
                  Cette plateforme permet à chaque étudiant d'évaluer ses
                  membres d'équipe lorsqu'ils effectuent un travail d'équipe.
                  Grâce à cette évaluation, les étudiants peuvent s'améliorer et
                  aprofondir leurs connaissances et la réflexion critique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mb-5"></h2>
      <Footer></Footer>
    </>
  );
}
export default Home;
