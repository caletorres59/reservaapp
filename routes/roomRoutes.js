'use strict'

var express = require('express');
var RoomController = require('../Controllers/roomController');

var api = express.Router();

var md_aut = require('../middlewares/auth');


api.post('/add-room', RoomController.saveRoom);
api.get('/get-rooms/:_id' , RoomController.getRoomsByIdHotel);
// api.get('/hotel/:id' , HotelController.getHotelById);
api.put('/update-room/:id', RoomController.updateRoom);


module.exports = api;