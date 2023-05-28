// authentication.js

const jwt = require('jsonwebtoken');
const { config } = require('../app');

exports.ensureAuth = (req, res, next) => {
    try {
        // Obtener el token de la cabecera de autorización
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).json({ message: 'La petición no tiene la cabecera de autenticación' });
        }

        // Verificar la expiración del token antes de decodificarlo
        const decodedToken = jwt.decode(token);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp <= currentTimestamp) {
            return res.status(401).json({ message: 'El token ha expirado' });
        }

        // Verificar el token utilizando la clave secreta del objeto `config`
        const decoded = jwt.verify(token, config.secretKey);

        // Almacenar los datos del usuario en el objeto `req`
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'El token ha expirado' });
        }
        return res.status(401).json({ message: 'Token no válido' });
    }
};
