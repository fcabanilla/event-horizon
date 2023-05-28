const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

const app = express();

const accessLogStream = rfs.createStream((time, index) => {
    if (time) {
        // Rotar el archivo de log cada día
        return `log-${time.getFullYear()}${time.getMonth()}${time.getDate()}-${index}.log`;
    } else {
        // Para el primer archivo de log
        return `log-${Date.now()}.log`;
    }
}, {
    path: path.join(__dirname, 'logs'), // la carpeta donde se almacenarán los logs
    size: '10M', // rotar el archivo cada 10 Megabytes escritos
    interval: '1d', // rotar el archivo diariamente
    compress: 'gzip' // comprimir los archivos rotados
});

// Configurar morgan para usar el stream de archivo
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware para habilitar CORS
app.use(cors());

// Parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Importar las rutas
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

// Usar las rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);

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

module.exports = app;
