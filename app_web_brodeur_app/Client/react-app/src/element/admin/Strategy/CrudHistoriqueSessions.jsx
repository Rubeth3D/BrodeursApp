class CrudHistoriqueSessions {
  CreateDonnees(changement) {}
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
  async UpdateDonnees() {
    const resultat = await fetch("http://localhost:8080/HistoriqueDesSessions");
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
