

import { Link } from "react-router-dom";
function NotfoundPage() {
  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5 display-3 fw-normal">
          404
        </h2>
        <h4 className="text-center mt-2 display-3 fw-normal">
          Aucune Page Trouvé{" "}
        </h4>
        <div class="d-flex justify-content-center align-items-center mt-5">
          <Link to={"/"}>
            <button className="btn btn-primary">Accueil</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default NotfoundPage;
