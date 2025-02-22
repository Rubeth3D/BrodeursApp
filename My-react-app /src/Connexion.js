const url = "http://localhost:3000";

async function Connexionjs() {
    const nomUtilisateur = document.getElementById("NoIdentification").value;
    const motDePasse = document.getElementById("exampleInputPassword").value;

    const reponse = await fetch(url + "/Connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomUtilisateur, motDePasse })
    });

    const resultat = await reponse.json();

    if (resultat === "Connexion réussie") {
        window.location.replace(url + "/Accueil"); // Rediriger vers la page d'accueil Source : https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    } else {
        alert(resultat);
    }
}

export default Connexionjs;