'use strict'

//importando mongoose..
var moongoose = require('mongoose');
var app = require('./app');
//puerto
var port = 3900;

//Conexión a base de datos
moongoose.Promise = global.Promise;

moongoose.connect('mongodb+srv://cale:jacko1234@cluster0-z9cng.azure.mongodb.net/test?retryWrites=true&w=majority', {useMongoClient: true})
                .then(() => {
                    console.log('conexion a base de datos ok...');
                    //Creo el servidor

                    app.listen(port, () => {
                        console.log('servidor ok .... http://localhost:3900');
                    })
                })
                .catch(err => console.log(err));

