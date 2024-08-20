const express = require('express');
const cors = require('cors');
const app = express();
const port = 3050;


// aqui van mis requerimientos para las rutas
const cameraRoutes = require('./src/modules/camera/cameraRoute')
const bussinesRoutes = require('./src/modules/bussines/bussinesroute')
const vehicleRoutes = require('./src/modules/vehicle/vehicleRoute')
const userRoutes = require('./src/modules/user/userRoutes')
const masterRoutes = require('./src/modules/masters/masterRoute')
const companyRoutes = require('./src/modules/companies/companiesRoutes')
app.use(express.json());
// Activar CORS
app.use(cors());

// aqui van mis rutas 
app.use('/api/camera', cameraRoutes)
app.use('/api/bussines', bussinesRoutes)
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/user', userRoutes)
app.use('/api/master', masterRoutes)
app.use('/api/companie', companyRoutes)

app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
  