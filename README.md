# Mi Proyecto Node.js

Este proyecto está construido con Express.js y se conecta a una base de datos MongoDB.

## Requisitos previos

- Node.js
- npm
- MongoDB

## Instalación

1. Clona el repositorio a tu máquina local:

```bash
# Clonar el repositorio
git clone https://github.com/fcabanilla/event-horizon

2. Navega al directorio del proyecto:

```bash
cd NOMBRE_DEL_DIRECTORIO
```

3. Instala las dependencias del proyecto:

```bash
npm install
```

4. Crea un archivo `.env` en el directorio raíz del proyecto. Este archivo debe contener las variables de entorno necesarias para el proyecto. Por ejemplo:

```bash
DB_CONNECTION=mongodb://localhost:27017/mydatabase
PORT=8000
```

Reemplaza los valores de ejemplo con tus propias configuraciones.

## Ejecución

Para iniciar el servidor, corre el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor en el puerto definido en el archivo `.env`. Si no se especificó ningún puerto, el servidor se iniciará en el puerto 8000.

Puedes acceder al servidor visitando http://localhost:8000 en tu navegador.

## Pruebas

Para ejecutar las pruebas, corre el siguiente comando:

```bash
npm test
```

## Estructura del Proyecto

El proyecto está dividido en dos archivos principales: `app.js` e `index.js`.

- `app.js`: Este archivo configura y exporta la aplicación Express, establece la conexión con la base de datos MongoDB y configura los middleware y rutas necesarios.

- `index.js`: Este archivo importa la aplicación desde `app.js` y lanza el servidor.

Todas las rutas de la API se encuentran en la carpeta `routes`.

