import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import NotfoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import Classe from "./pages/Classe/classe.jsx";
import Cours from "./pages/Cours/Cours.jsx";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Connexion", element: <Connexion /> },
  { path: "/Inscription", element: <Inscription /> },
  { path: "/DashBoard", element: <DashBoard /> },
  { path: "/classe", element: <Classe /> },
  { path: "/cours", element: <Cours /> },
  { path: "*", element: <NotfoundPage /> },
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
