// src/modules/vehicle/models/VehicleModel.js
class VehicleModel {
    constructor(data) {
      this.plate = data.plate;
      this.vehicle_id = data.vehicle_id;
      this.direction = data.direction;
      this.bussines_id = data.bussines_id;
    }
  
    static requiredFields() {
      return ['plate', 'vehicle_id', 'direction', 'bussines_id'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of VehicleModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = VehicleModel;
  