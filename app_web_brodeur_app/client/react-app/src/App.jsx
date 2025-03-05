import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import NotfoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import CreateAccount from "./pages/CreateAccount/CreateAccount.jsx";
import Cours from "./pages/Cours/Cours.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Home/>},
  { path: "/Connexion", element: <Connexion /> },
  { path: "/Connexion/CreateAccount", element: <CreateAccount/> },
  {path: "/cours", element:<Cours/>},
  { path: "*", element: <NotfoundPage/> }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
