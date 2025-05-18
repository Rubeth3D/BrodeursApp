class CrudTables {
  constructor(strategie) {
    this.strategie = strategie;
  }
  ChangerStrategie(strategie) {
    this.strategie = strategie;
  }
  async ReadDonnees() {
    return await this.strategie.ReadDonnees();
  }

  async CreateDonnees(data) {
    return await this.strategie.CreateDonnees(data);
  }

  UpdateDonnees(id, body) {
    return this.strategie.UpdateDonnees(id, body);
  }

  async DeleteDonnees(id) {
    return await this.strategie.DeleteDonnees(id);
  }
}
export default CrudTables;
