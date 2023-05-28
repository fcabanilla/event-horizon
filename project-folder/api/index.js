const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, 'config.env') });

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Comentar las líneas que importan rutas y modelos que aún no están listos
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/events', require('./routes/event'));

mongoose.set('strictQuery', false);

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos', error);
    });

// Puerto en el que se ejecutará el servidor
const port = process.env.PORT || 8000;

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}. Accede en http://localhost:${port}`);
});