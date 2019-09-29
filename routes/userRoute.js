'use strict'

var express = require('express');
var UserController = require('../Controllers/userControlles');

var api = express.Router();

var md_aut = require('../middlewares/auth');

api.get('/home', md_aut.ensureAuth ,UserController.home);
api.get('/user/:id', md_aut.ensureAuth ,UserController.getUser);
api.get('/users/:page?', md_aut.ensureAuth ,UserController.getUsers);
api.post('/register', UserController.saveUsers);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id',md_aut.ensureAuth, UserController.updateUser);

module.exports = api;