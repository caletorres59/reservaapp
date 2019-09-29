'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas

var user_routes = require('./routes/userRoute');
var hotel_routes = require('./routes/hotelRoutes');
var room_routes = require('./routes/roomRoutes');
var reserve_routes = require('./routes/reservaRoutes');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var path = require('path');

//cors

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//rutas
app.use('/', express.static('client',{redirect: false}));
app.use('/api', user_routes);
app.use('/api', hotel_routes);
app.use('/api', room_routes);
app.use('/api', reserve_routes);

//exporto la configuración


app.get('*', function(req,res,next){
    res.sendFile(path.resolve('client/index.html'));
});
module.exports = app;