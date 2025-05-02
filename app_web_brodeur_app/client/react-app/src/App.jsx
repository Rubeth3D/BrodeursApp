import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import NotfoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import Inscription from "./pages/Inscription/Inscription.jsx";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import VerificationCode from "./pages/VerificationCode/VerificationCode.jsx";
import Admin from "../src/element/Admin.jsx";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/Connexion", element: <Connexion /> },
  { path: "/Inscription", element: <Inscription /> },
  { path: "/DashBoard", element: <DashBoard /> },
  { path: "*", element: <NotfoundPage /> },
  { path: "/VerificationCode", element: <VerificationCode /> },
  { path: "/Admin", element: <Admin /> },
]);
function App() {
  useEffect(() => {
    document.title = "Évaluation par les pairs"; // Aider par ChatGPT pour le titre de l'onglet
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = "/LogoIcon.png"; // Aider par ChatGPT pour l'icône de l'onglet
    }
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
