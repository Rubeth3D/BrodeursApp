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
        window.location.replace(url + "/Cours"); // Rediriger vers la page de cours Source : https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    } else {
        alert(resultat);
    }
}

async function Inscriptionjs(){
    const nomUtilisateur = document.getElementById("NoIdentification").value;
    const motDePasse = document.getElementById("exampleInputPassword").value;
    const nom = document.getElementById("Nom").value;
    const prenom = document.getElementById("Prenom").value;

    const reponse = await fetch(url + "/CreateAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomUtilisateur, motDePasse, nom, prenom})
    });

    const resultat = await reponse.json();

    if (resultat === "Inscription réussie") {
        window.location.replace(url + "/Cours"); // Rediriger vers la page de cours Source : https://www.w3schools.com/howto/howto_js_redirect_webpage.asp
    } else {
        alert(resultat);
    }
}

export default Connexionjs;