// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

console.debug('SECRET_KEY:', process.env.SECRET_KEY);
console.debug('TOKEN_EXPIRATION:', process.env.TOKEN_EXPIRATION);
console.debug('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.debug('PORT:', process.env.PORT);
console.debug('API_VERSION:', process.env.API_VERSION);
console.debug('API_PREFIX:', process.env.API_PREFIX);

const config = {
    secretKey: process.env.SECRET_KEY,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    corsOrigin: process.env.CORS_ORIGIN,
};

const api = {
    port: process.env.PORT,
    apiVersion: process.env.API_VERSION,
    apiPrefix: process.env.API_PREFIX,
}

module.exports = {
    config,
    api
};
