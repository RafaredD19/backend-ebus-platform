// src/modules/user/models/UserModel.js
class UserModel {
    constructor(data) {
      this.username = data.username;
      this.password = data.password;
    }
  
    static requiredFields() {
      return ['username', 'password'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of UserModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = UserModel;
  