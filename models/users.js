'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var UserSchema =({
  nombre: String,
  apellido: String,
  email: String,
  telefono: String,
  password: String,
  role: String,
  image: String
});

module.exports = moongose.model('User', UserSchema);