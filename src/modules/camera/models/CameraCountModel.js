
class CameraCountModel {
    constructor(data) {
      this.vehicle_id = data.vehicle_id;
      this.door = data.door;
      this.count = data.count;
      this.dateCount = data.dateCount;
    }
  
    static requiredFields() {
      return ['vehicle_id', 'door', 'count', 'dateCount'];
    }
  
    validate() {
      const missingFields = [];
      for (const field of CameraCountModel.requiredFields()) {
        if (!this[field]) {
          missingFields.push(field);
        }
      }
  
      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(', ')}`);
      }
    }
  }
  
  module.exports = CameraCountModel;
  