# Backend del sistema de gestión de eventos

Este es el backend para el sistema de gestión de eventos. Este proyecto es una API RESTful construida con Node.js, Express y MongoDB.

## Prerequisitos

Deberá tener Node.js y npm instalados en su máquina. Además, deberá tener una instancia de MongoDB a la que pueda conectarse.

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/fcabanilla/event-horizon

# Entrar en el directorio del proyecto
cd backend

# Instalar las dependencias
npm install
```

## Uso

Este proyecto incluye los siguientes scripts npm:

```bash
# Iniciar el servidor para producción
npm start

# Iniciar el servidor para desarrollo (con nodemon para recarga automática)
npm run dev
```

El servidor se ejecutará en http://localhost:8000.

## API Endpoints

Esta API proporciona los siguientes endpoints, de acuerdo a la definición Swagger:

- GET /api/v1/users: obtener todos los usuarios
- POST /api/v1/users: crear un nuevo usuario
- GET /api/v1/users/{userId}: obtener un usuario específico por ID
- PUT /api/v1/users/{userId}: actualizar un usuario específico por ID
- DELETE /api/v1/users/{userId}: eliminar un usuario específico por ID

- GET /api/v1/events: obtener todos los eventos
- POST /api/v1/events: crear un nuevo evento
- GET /api/v1/events/{eventId}: obtener un evento específico por ID
- PUT /api/v1/events/{eventId}: actualizar un evento específico por ID
- DELETE /api/v1/events/{eventId}: eliminar un evento específico por ID

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE.md](LICENSE.md) para más detalles.
