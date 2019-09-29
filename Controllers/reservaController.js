'use strict'

var Reserva = require('../models/reserva');


function homeHotel(req,res){

    res.status(200).send({
        message: 'estamos en pruebas reserva ok'
    })

}

function saveReserva(req, res){

    var reserva = new Reserva();
    var params = req.body;

    console.log(req);

    if(params.nombres && params.apellidos && params.telefono ){
            
           
           reserva.nombres = params.nombres;
           reserva.apellidos = params.apellidos;
           reserva.fechaNacimiento = params.fechaNacimiento;
           reserva.genero = params.genero;
           reserva.tipoDocumento = params.tipoDocumento;
           reserva.numeroDocumento = params.numeroDocumento;
           reserva.correo = params.correo;
           reserva.telefono = params.telefono;
           reserva.nombreContacto = params.nombreContacto;
           reserva.telefonoContacto = params.telefonoContacto;
           reserva.fechaEntrada = params.fechaEntrada;
           reserva.fechaSalida = params.fechaSalida;
           reserva.habitacion = params.habitacion;
           reserva.numeroPersonas = params.numeroPersonas;
          
          
           
        console.log(reserva);
          
        reserva.save((err, reservaStored) => {
                    if(err){
                        return res.status(500).send({
                            response: 'error',
                            message: 'Problemas al guardar el Hotel',
                            error : err
                        })


                    }

                    if(reservaStored){
                        res.status(200).send({
                            response: 'ok',
                            message: 'Habitación guardada con exito',
                            reserva: reservaStored
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

function getReserva(req, res){

    
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 40;

    Reserva.find().paginate(page, itemsPerPage, (err, reservas, total) =>{
       
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!reservas || reservas == '') return res.status(404).send({message: 'No tienes reservas '});

        return res.status(200).send({
            reservas,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })

    })
}





module.exports = {
    homeHotel,
    saveReserva,
    getReserva
   
}