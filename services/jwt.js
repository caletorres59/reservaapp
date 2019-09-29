'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_reserva_torres';

exports.createToken = function(user){

var payload = {
  nombre: user.nombre,
  apellido: user.apellido,
  email: user.email,
  telefono: user.telefono,
  role: user.role,
  image: user.image,
  iat: moment().unix(),
  exp: moment().add(30, 'days').unix

};

return jwt.encode(payload, secret);


}