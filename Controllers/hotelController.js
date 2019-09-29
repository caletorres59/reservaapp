'use strict'

var Hotel = require('../models/hoteles');


function homeHotel(req,res){

    res.status(200).send({
        message: 'estamos en pruebas reserva ok'
    })

}

function saveHotel(req, res){

    var hotel = new Hotel();
    var params = req.body;

    if(params.nombre && params.descripcion && params.logo && 
        params.telefono && params.estrellas && params.direccion){
            
            //set data user
           hotel.nombre = params.nombre;
           hotel.descripcion = params.descripcion;
           hotel.logo = params.logo;
           hotel.telefono = params.telefono;
           hotel.estrellas = params.estrellas;
            hotel.direccion = params.direccion
          
                hotel.save((err, hotelStored) => {
                    if(err){
                        return res.status(500).send({
                            response: 'error',
                            message: 'Problemas al guardar el Hotel',
                            error : err
                        })


                    }

                    if(hotelStored){
                        res.status(200).send({
                            response: 'ok',
                            message: 'Habitación guardada con exito',
                            hotel: hotelStored
                        })
                    }else{
                        res.status(404).send({
                            response: 'error',
                            message: 'no se pudo guardar el hotel'
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

function getHotels(req, res){

    
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage =40 ;

    Hotel.find().paginate(page, itemsPerPage, (err, hotels, total) =>{
       
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!hotels || hotels == '') return res.status(404).send({message: 'No tienes hoteles creados'});

        return res.status(200).send({
            hotels,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })

    })
}

function getHotelById(req, res){
    var hotelId = req.params.id;

    Hotel.findById(hotelId, (err, hotel) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!hotel || hotel == '') return res.status(404).send({message: 'El hotel no existe'});

        return res.status(200).send({
            hotel
        });
    })

}

//Update hotel

function updateHotel(req,res){
    var hotelId = req.params.id;
    var update = req.body;
  
    if(hotelId != req.body._id){res.status(500).send({message: 'error en la petición'});}
    Hotel.findByIdAndUpdate(hotelId, update, {new:true} , (err, hotelUpdated) => {

      
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(hotelUpdated == "" || !hotelUpdated) return res.status(404).send({message: 'No se ha podido actualizar el hotel'});
                
        return res.status(200).send({
           hotel:   hotelUpdated
        })
    });
}

module.exports = {
    homeHotel,
    getHotels,
    saveHotel,
    getHotelById,
    updateHotel
}