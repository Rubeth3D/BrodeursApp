import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import NotfoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import CreateAccount from "./pages/CreateAccount/CreateAccount.jsx";

const router = createBrowserRouter([
  {path:"/", element: <App></App>},
  {path:"/Home", element:<Home></Home>},
  {path:"/Connexion", element: <Connexion/>},
  {path:"/Connexion/CreateAccount", element: <CreateAccount/> },
  {path:"*", element: <NotfoundPage />}
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
