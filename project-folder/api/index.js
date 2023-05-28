// index.js

const app = require('./app');
const { api } = require('./config');  // import config and api from config.js file

if (process.env.NODE_ENV !== 'test') {
    const { port, apiVersion, apiPrefix } = api;

    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}. Accede en http://localhost:${port}${apiPrefix}/${apiVersion}/`);
    });
}
