'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var HotelSchema =({
  nombre: String,
  descripcion: String,
  logo: String,
  telefono: String,
  estrellas: String,
  direccion: String,
  ciudad:String,
  status: String,
  user: {type: Schema.ObjectId, ref: 'User' }
});


module.exports = moongose.model('Hotel', HotelSchema);