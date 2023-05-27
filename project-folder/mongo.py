from pymongo import MongoClient

# Conexión a la base de datos
client = MongoClient('mongodb://localhost:27017/')
db = client['event-horizon-db']

# Población de la colección "usuarios"
usuarios_collection = db['usuarios']
usuarios_data = [
    {
        'nombre': 'Usuario1',
        'correoElectronico': 'usuario1@example.com',
        'contrasena': 'contrasena1'
    },
    {
        'nombre': 'Usuario2',
        'correoElectronico': 'usuario2@example.com',
        'contrasena': 'contrasena2'
    },
    # Agrega más datos de prueba de usuarios aquí
]
usuarios_collection.insert_many(usuarios_data)

# Población de la colección "eventos"
eventos_collection = db['eventos']
eventos_data = [
    {
        'nombre': 'Evento1',
        'descripcion': 'Descripción del evento 1',
        'fecha': '2023-06-01',
        'hora': '19:00',
        'lugar': 'Lugar del evento 1'
    },
    {
        'nombre': 'Evento2',
        'descripcion': 'Descripción del evento 2',
        'fecha': '2023-06-02',
        'hora': '18:30',
        'lugar': 'Lugar del evento 2'
    },
    # Agrega más datos de prueba de eventos aquí
]
eventos_collection.insert_many(eventos_data)

# Población de la colección "registros"
registros_collection = db['registros']
registros_data = [
    {
        'usuarioId': usuarios_data[0]['_id'],  # Asegúrate de tener el ID correcto del usuario
        'eventoId': eventos_data[0]['_id']  # Asegúrate de tener el ID correcto del evento
    },
    {
        'usuarioId': usuarios_data[1]['_id'],  # Asegúrate de tener el ID correcto del usuario
        'eventoId': eventos_data[1]['_id']  # Asegúrate de tener el ID correcto del evento
    },
    # Agrega más datos de prueba de registros aquí
]
registros_collection.insert_many(registros_data)

# Cierra la conexión a la base de datos
client.close()
