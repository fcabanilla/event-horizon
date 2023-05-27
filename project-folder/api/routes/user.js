 
'use strict';

const express = require('express');
const UserController = require('../controllers/user');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.post('/user', md_auth.ensureAuth, UserController.saveUser);
api.get('/users/:role?', md_auth.ensureAuth, UserController.getUsers);
api.put('/user/:id', md_auth.ensureAuth, UserController.updateUser);
api.delete('/user/:id', md_auth.ensureAuth, UserController.deleteUser);

module.exports = api;
