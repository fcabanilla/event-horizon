const app = require('./app');

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 8000;

    app.listen(port, () => {
        console.log(`Servidor iniciado en el puerto ${port}. Accede en http://localhost:${port}`);
    });
}
