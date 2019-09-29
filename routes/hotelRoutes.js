'use strict'

var express = require('express');
var HotelController = require('../Controllers/hotelController');

var api = express.Router();

var md_aut = require('../middlewares/auth');


api.post('/add-hotel', HotelController.saveHotel);
api.get('/get-hotels/:page?' , HotelController.getHotels);
api.get('/hotel/:id' , HotelController.getHotelById);
api.put('/update-hotel/:id', HotelController.updateHotel);


module.exports = api;