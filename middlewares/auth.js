'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_reserva_torres';

exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({
            message: 'la petición no tiene autorización'
        });
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                message: 'el token a expirado'
            })
        }
    }catch(exe){
        return res.status(404).send({
            message: 'el token no es valido'
        })
    }

    req.user = payload;

    next();
    
}