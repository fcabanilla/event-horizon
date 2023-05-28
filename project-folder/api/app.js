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

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());

app.use(express.json());

// Middleware para configurar cabeceras HTTP
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

// Importar las rutas
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
// Añade las rutas que necesites aquí

// Montar las rutas en la aplicación
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);
// Añade las rutas que necesites aquí

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
