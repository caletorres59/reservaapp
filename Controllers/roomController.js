'use strict'

var Room = require('../models/rooms');


function homeRoom(req,res){

    res.status(200).send({
        message: 'estamos en pruebas reserva ok'
    })

}

function saveRoom(req, res){

    var room = new Room();
    var params = req.body;



    if(params.numero && params.costo && params.impuesto && 
        params.tipo && params.location){
            
            //set data user
            room.numero = params.numero;
            room.costo = params.costo;
            room.impuesto = params.impuesto;
            room.tipo = params.tipo;
            room.ubicacion = params.location;
            room.status = params.status;
            room.hotel = params.hotel;
            room.save((err, roomStored) => {
                    if(err){
                        return res.status(500).send({
                            response: 'error',
                            message: 'Problemas al guardar el usuario',
                            error : err
                        })


                    }

                    if(roomStored){
                        res.status(200).send({
                            response: 'ok',
                            message: 'Habitación guardada con exito',
                            room: roomStored
                        })
                    }else{
                        res.status(404).send({
                            response: 'error',
                            message: 'no se pudo guardar la habitacion'
                        })
                    }
                });
            

        }else{
            res.status(200).send({
                response: 'err',
                message: 'envia todos los campos necesarios'
            })
        }
}

function getRoomsByIdHotel(req, res){

    let id =  req.params;
    var page = 1;


    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 5;
    console.log(id);
    Room.find({hotel: id}).paginate(page, itemsPerPage, (err, rooms, total) =>{
            console.log('entro...');
            console.log(rooms);
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!rooms) return res.status(404).send({message: 'No existen habitaciones para este hotel'});

        return res.status(200).send({
            rooms : rooms,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })

    })
}

function updateRoom(req,res){
    var roomId = req.params.id;
    var update = req.body;
  
    if(roomId != req.body._id){res.status(500).send({message: 'error en la petición'});}
    Room.findByIdAndUpdate(roomId, update, {new:true} , (err, roomUpdated) => {

      
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(roomUpdated == "" || !roomUpdated) return res.status(404).send({message: 'No se ha podido actualizar el hotel'});
                
        return res.status(200).send({
           room:   roomUpdated,
           status: 'ok'
        })
    });
}


module.exports = {
    homeRoom,
    saveRoom,
    getRoomsByIdHotel,
    updateRoom
}