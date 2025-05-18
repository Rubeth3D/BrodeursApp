class CrudClasse {
  async CreateDonnees(body) {
    try {
      console.log("Body historique session a creer : ", body);
      const resultat = await fetch(`http://localhost:8080/classe`, {
        body: body,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const json = await resultat.json();
      return {
        status: resultat.status,
        ok: resultat.ok,
        body: json,
      };
    } catch (err) {
      console.log("Erreur lors du insert de historique de sessions ", err);
      return {
        status: 500,
        ok: false,
        body: { message: "Erreur de communication avec le serveur." },
      };
    }
  }
  async ReadDonnees() {
    const resultat = await fetch("http://localhost:8080/commentaire", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    return await resultat.json();
  }
  async UpdateDonnees(id, body) {
    try {
      console.log("allo");
      console.log("Body commentaire a update : ", body);
      console.log("id commentaire a update : ", id);
      const { _id, ...bodySansid } = body;
      console.log("Resultat Update Commentaire : ");

      const resultat = await fetch(`http://localhost:8080/commentaire/${id}`, {
        body: JSON.stringify(bodySansid),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const json = await resultat.json();
      return {
        status: resultat.status,
        ok: resultat.ok,
        body: json,
      };
    } catch (err) {
      console.log("Erreur lors du update du commentaire ", err);
      return {
        status: 500,
        ok: false,
        body: { message: "Erreur de communication avec le serveur." },
      };
    }
  }
  async DeleteDonnees(id) {
    const resultat = await fetch(`http://localhost:8080/commentaire/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return await resultat.json();
  }
}

export default CrudCommentaire;
