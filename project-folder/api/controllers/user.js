const User = require('../models/user');

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
    const user = new User({ name, email, password });
    user.save()
        .then(savedUser => {
            res.status(201).json(savedUser); // Envía una respuesta de éxito con el código de estado 201 (Created)
        })
        .catch(error => {
            res.status(500).json({ error: 'Error creating user' }); // Envía una respuesta de error con el código de estado 500 (Internal Server Error)
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
    getUserById,
    updateUser,
    deleteUser
};
