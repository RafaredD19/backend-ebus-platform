// src/modules/companies/models/CompanyModel.js
class CompanyModel {
    constructor(data) {
      this.username = data.username;
      this.password = data.password;
      this.nameCompany = data.nameCompany;
    }
  
    static requiredFields() {
      return ['username', 'password', 'nameCompany'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of CompanyModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = CompanyModel;
  