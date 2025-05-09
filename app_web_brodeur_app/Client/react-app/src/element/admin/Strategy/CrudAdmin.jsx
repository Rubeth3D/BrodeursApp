class CrudAdmin {
  constructor(strategie) {
    this.strategie = strategie;
  }
  changerStrategie(nouvelleStrategie) {
    this.Strategie = nouvelleStrategie;
  }

  async ReadDonnees() {
    return await this.strategie.ReadDonnees();
  }

  async CreateDonnees(data) {
    return await this.strategie.CreateDonnees(data);
  }

  UpdateDonnees(data) {
    return this.strategie.UpdateDonnees(data);
  }

  async DeleteDonnees(id) {
    return await this.strategie.DeleteDonnees(id);
  }
}
export default CrudAdmin;
