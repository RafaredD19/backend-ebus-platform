const express = require('express');
const cors = require('cors');
const app = express();
const port = 3050;





// aqui van mis requerimientos para las rutas

app.use(express.json());

// Activar CORS
app.use(cors());

// aqui van mis rutas 

// Iniciar el servidor
app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
  