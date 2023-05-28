// app.js

/***************************************
 ********* IMPORT SECTION START ********
 ***************************************/

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const { config, api } = require('./config');  // import config from config.js file

/***************************************
 ********* CONFIG SECTION START ********
 ***************************************/

console.debug('Config:', config);
console.debug('Api:', api);

const app = express();

const accessLogStream = rfs.createStream((time, index) => {
    if (time) {
        return `log-${time.getFullYear()}${time.getMonth()}${time.getDate()}-${index}.log`;
    } else {
        return `log-${Date.now()}.log`;
    }
}, {
    path: path.join(__dirname, 'logs'),
    size: '10M',
    interval: '1d',
    compress: 'gzip'
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors({ origin: config.corsOrigin }));  // use config.corsOrigin

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});

/***************************************
 ********* ROUTE SECTION START *********
 ***************************************/

const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');

app.use(api.apiPrefix + '/' + api.apiVersion + '/users', userRoutes);
app.use(api.apiPrefix + '/' + api.apiVersion + '/events', eventRoutes);

/***************************************
 ********* ERROR SECTION START *********
 ***************************************/

app.use((err, req, res, next) => {
    console.error(err); // Imprime el error en la consola
    // También puedes guardar el error en un archivo de registro

    res.status(500).json({ error: 'Internal Server Error' });
});

/***************************************
 ********* DB SECTION START ************
 ***************************************/

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // user: process.env.DB_USER,
    // pass: process.env.DB_PASS
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos', error);
    });

module.exports = app;
