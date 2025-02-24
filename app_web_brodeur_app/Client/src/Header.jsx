function Header(){
    return(
        <header style={{backgroundColor: "#2C3E50", color: "white", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top:"0", width: "100%"}}>
            <a href="#" style={{color: "white", marginRight: "auto", fontWeight: "bold"}}>Évaluation par les pairs</a>
            <a href="#" style={{color: "white", margin: "20px"}}>Acceuil</a>
            <a href="#" style={{color: "white", margin: "20px"}}>Cours</a>
            <a href="#" style={{color: "white", margin: "20px"}}>Connexion</a>
        </header>
    );
}
export default Header;