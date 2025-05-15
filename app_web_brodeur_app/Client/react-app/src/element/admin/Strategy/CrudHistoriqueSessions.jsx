class CrudHistoriqueSessions {
  async CreateDonnees(body) {
    console.log("Body historique session a creer : ", body);

    const resultat = await fetch(
      `http://localhost:8080/HistoriqueDesSessions`,
      {
        body: body,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    resultat.json();
  }
  async ReadDonnees() {
    const resultat = await fetch(
      "http://localhost:8080/HistoriqueDesSessions",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    return await resultat.json();
  }
  async UpdateDonnees(id, body) {
    console.log("Body historique session a modifier : ", body);

    const resultat = await fetch(
      `http://localhost:8080/HistoriqueDesSessions/${id}`,
      {
        body: JSON.stringify(body),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    resultat.json();
  }
  async DeleteDonnees(id) {
    const resultat = await fetch(
      `http://localhost:8080/HistoriqueDesSessions/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    return await resultat.json();
  }
}

export default CrudHistoriqueSessions;
