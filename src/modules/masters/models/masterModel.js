
class MasterModel {
    constructor(data) {
      this.bussines_id = data.bussines_id;
      this.username = data.username;
      this.password = data.password;
      this.masterName = data.masterName;
      this.role = 'MASTER';  // Rol por defecto
    }
  
    static requiredFields() {
      return ['bussines_id', 'username', 'password', 'masterName'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of MasterModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = MasterModel;
  