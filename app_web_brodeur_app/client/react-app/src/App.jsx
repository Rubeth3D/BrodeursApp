import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import NotfoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import CreateAccount from "./pages/CreateAccount/CreateAccount.jsx";
import Classe from "./pages/Classe/classe.jsx";
import Etudiant from "./pages/Etudiant/etudiant.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> }, // Ajout de la route pour la page d'accueil
  { path: "/Connexion", element: <Connexion /> }, // Ajout de la route pour la page de connexion
  { path: "/Connexion/CreateAccount", element: <CreateAccount /> }, // Ajout de la route pour la page de création de compte
  { path: "/etudiant", element: <Etudiant /> }, // Ajout de la route pour la page de l'étudiant
  { path: "/classe", element: <Classe /> }, // Ajout de la route pour la page de classe
  { path: "*", element: <NotfoundPage /> }, // Ajout de la route pour la page non trouvée
]);
function App() {
  useEffect(() => {
    document.title = "Évaluation par les pairs"; // Aider par ChatGPT pour le titre de l'onglet
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
