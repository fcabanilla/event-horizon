// controllers/user.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

const getAllUsers = (req, res) => {

    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error retrieving users' });
        });
};

const createUser = (req, res) => {
    const { name, email, password } = req.body;
    // Hash de la contraseña utilizando bcrypt
    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            const user = new User({ name, email, password: hashedPassword });
            return user.save();
        })
        .then(savedUser => {
            console.info({ user: savedUser })
            res.status(201).json({ user: savedUser });
        })
        .catch(error => {
            console.error(error); // Imprime el error en la consola
            res.status(500).json({
                error: 'Error creating user',
                message: error.message,
                stack: error.stack
            });
        });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            // Comparar la contraseña ingresada con la contraseña almacenada utilizando bcrypt
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ error: 'Invalid password' });
                    }
                    // Generar token JWT con la información del usuario
                    const token = jwt.sign({ userId: user._id }, config.secretKey, { expiresIn: config.tokenExpiration });
                    res.json({ user, token });
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error logging in' });
        });
};

const getUserById = (req, res) => {
    const { userId } = req.params;
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error retrieving user' });
        });
};

const updateUser = (req, res) => {
    const { userId } = req.params;
    const { name, email } = req.body;
    User.findByIdAndUpdate(userId, { name, email }, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error updating user' });
        });
};

const deleteUser = (req, res) => {
    const { userId } = req.params;
    User.findByIdAndRemove(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error deleting user' });
        });
};

module.exports = {
    getAllUsers,
    createUser,
    login,
    getUserById,
    updateUser,
    deleteUser
};
