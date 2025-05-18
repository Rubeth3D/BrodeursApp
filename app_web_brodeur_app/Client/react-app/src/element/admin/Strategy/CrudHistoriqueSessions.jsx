class CrudHistoriqueSessions {
  async CreateDonnees(body) {
    try {
      const resultat = await fetch(
        `http://localhost:8080/HistoriqueDesSessions`,
        {
          body: body,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
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
        body: "Erreur de communication avec le serveur.",
      };
    }
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
    try {
      console.log("Update des historique de sessions : ", body);
      const resultat = await fetch(
        `http://localhost:8080/HistoriqueDesSessions/${id}`,
        {
          body: JSON.stringify(body),
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const json = await resultat.json(); // attention : ne faire qu'une seule fois
      return {
        status: resultat.status,
        ok: resultat.ok,
        body: json,
      };
    } catch (err) {
      console.log("Erreur lors du update de historique de sessions ", err);
      return {
        status: 500,
        ok: false,
        body: "Erreur de communication avec le serveur.",
      };
    }
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
