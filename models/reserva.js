'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var ReservaSchema =({
  nombres: String,
  apellidos: String,
  fechaNacimiento: Date,
  genero: String,
  tipoDocumento: String,
  numeroDocumento: String,
  correo: String,
  telefono:String,
  telefonoContacto: String,
  nombreContacto: String,
  telefonoContacto: String,
  fechaEntrada: Date,
  fechaSalida: Date,
  numeroPersonas: Number,
  habitacion: { type: Schema.ObjectId, ref: 'Room' }
});


module.exports = moongose.model('Reserva', ReservaSchema);