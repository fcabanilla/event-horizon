import os

# Crear directorios
directories = ['controllers', 'middlewares', 'models', 'routes', 'services']
for directory in directories:
    os.makedirs(directory, exist_ok=True)

# Crear archivos JavaScript
javascript_files = [
    'controllers/user.js',
    'controllers/event.js',
    'middlewares/authentication.js',
    'models/user.js',
    'models/event.js',
    'routes/userRoutes.js',
    'routes/eventRoutes.js',
    'services/userService.js',
    'services/eventService.js'
]
for file_path in javascript_files:
    with open(file_path, 'w') as file:
        file.write('// Archivo JavaScript creado')

# Crear archivo index.js
index_file_path = 'index.js'
with open(index_file_path, 'w') as file:
    for file_path in javascript_files:
        file_name = os.path.basename(file_path)
        module_name = os.path.splitext(file_name)[0]
        file.write(f"const {module_name} = require('./{file_path}');\n")

print("Archivos y directorios creados exitosamente.")
