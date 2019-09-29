'use strict'

var express = require('express');
var ReservaController = require('../Controllers/reservaController');

var api = express.Router();

var md_aut = require('../middlewares/auth');


api.post('/add-reserve', ReservaController.saveReserva);
api.get('/get-reservas/:page?' , ReservaController.getReserva);


module.exports = api;