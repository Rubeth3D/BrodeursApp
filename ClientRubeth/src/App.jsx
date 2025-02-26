import Header from "./Header.jsx"
import Footer from "./Footer.jsx";
import Accueil from "./Accueil.jsx";
import Connexion from "./Connexion.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; {/* Source : https://stackoverflow.com/questions/70380271/import-routes-in-react-with-react-router  et ChatGPT pour pouvoir mettre dans App.jsx*/}


function App() {
  return(
  <>
    <Router>
      <Routes>
        <Route path="/" element={<Accueil/>} />
        <Route path="/Connexion" element={<Connexion />} />
      </Routes>
    </Router>
  </>
  );
}

export default App
