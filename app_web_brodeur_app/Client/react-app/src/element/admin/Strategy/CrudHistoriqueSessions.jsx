class CrudHistoriqueSessions {
  async CreateDonnees() {}
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
