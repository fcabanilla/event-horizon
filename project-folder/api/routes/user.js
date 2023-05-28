// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const authMiddleware = require('../middlewares/authentication');

// Rutas para usuarios
router.get('', /*authMiddleware.ensureAuth,*/ userController.getAllUsers);
router.post('', /*authMiddleware.ensureAuth,*/ userController.createUser);
router.post('/login', userController.login); // Nueva ruta para el inicio de sesión
router.get('/:userId', /*authMiddleware.ensureAuth,*/ userController.getUserById);
router.put('/:userId', /*authMiddleware.ensureAuth,*/ userController.updateUser);
router.delete('/:userId', /*authMiddleware.ensureAuth,*/ userController.deleteUser);

module.exports = router;
