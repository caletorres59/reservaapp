'use strict'

var moongose = require('mongoose');
var Schema = moongose.Schema;

var RoomSchema =({
  numero: String,
  costo: Number,
  impuesto: Number,
  tipo: String,
  location: String,
  status: Boolean,
  hotel: { type: Schema.ObjectId, ref: 'Hotel' }
});


module.exports = moongose.model('Room', RoomSchema);