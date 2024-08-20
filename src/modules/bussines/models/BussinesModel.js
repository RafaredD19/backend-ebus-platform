
class BussinesModel {
    constructor(data) {
      this.ruc = data.ruc;
      this.name = data.name;
      this.direction = data.direction;
    }
  
    static requiredFields() {
      return ['ruc', 'name', 'direction'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of BussinesModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = BussinesModel;
  