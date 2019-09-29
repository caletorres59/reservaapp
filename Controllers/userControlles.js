'use strict'

var User = require('../models/users');
var bcrypt = require('bcrypt-nodejs');
var paginationMongoose = require ('mongoose-pagination');
var jwt = require('../services/jwt');

function home(req,res){

    res.status(200).send({
        message: 'estamos en pruebas reserva ok'
    })

}

//Guardar usuario 
function saveUsers(req, res){

    var user = new User();
    var params = req.body;
    console.log(params);
    if(params.nombre && params.apellido && params.email && 
        params.telefono && params.password){
            
            //set data user
            user.nombre = params.nombre;
            user.apellido = params.apellido;
            user.email = params.email;
            user.telefono = params.telefono;
            user.role = 'ROLE_USER';
            user.image = null;

            //Unique email restrict 

            User.find({email: user.email.toLowerCase()}).exec((err, users) => {
                    if(err) return res.status(500).send({message: 'Error en la petición'});
                    if(users && users.length >= 1){
                        return res.status(200).send({
                            message: 'El usuario ya existe'
                        })
                    }else{
                        bcrypt.hash(params.password, null, null, (err, hash) => {
                            user.password = hash;
                            user.save((err, userStored) => {
                                if(err){
                                    return res.status(500).send({
                                        response: 'error',
                                        message: 'Problemas al guardar el usuario',
                                        error : err
                                    })
            
            
                                }
            
                                if(userStored){
                                    res.status(200).send({
                                        response: 'ok',
                                        message: 'Usuario guardado',
                                        user: userStored
                                    })
                                }else{
                                    res.status(404).send({
                                        response: 'error',
                                        message: ' no se ha registrado el usuario'
                                    })
                                }
                            });
                        });
                    }
                })
          

        }else{
            res.status(200).send({
                response: 'err',
                message: 'envia todos los campos necesarios'
            })
        }
}
//Login
function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email}, (err, user) => {
            if(err) return res.status(500).send({  response: 'error',message: 'error en la petición'})
            if(user){
                bcrypt.compare(password, user.password, (err, check) => {

                    if(check){
                        //retorno al usuario
                        if(params.gettoken){
                            //devuelvo un token

                            // genero el token
                            return res.status(200).send({
                                token: jwt.createToken(user)
                            })

                        }else{

                            user.password = undefined;
                            return res.status(200).send({
                                user
                            });

                        }
                       

                    }else{
                        return res.status(404).send({  response: 'error', message: 'error en la petición'})
                    }
                })
            }else{
                return res.status(404).send({  response: 'error', message: 'error en la petición..'})
            }
    });
}

//Conseguir los datos de un usuari

function getUser(req, res){
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        return res.status(200).send({
            user
        });
    })
}

//Devolver un listado de usuarios paginados

function getUsers(req, res){

    var identity_user_id = req.user.id;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) =>{
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!users) return res.status(404).send({message: 'no hay usuarios diponibles'});

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total/itemsPerPage)
        })

    })
}

//Update user

function updateUser(req,res){
    var userId = req.params._id;
    var update = req.body;

    //Borro la propiedad password

    delete update.password;

    if(userId != req.user.id) return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
    User.findOneAndUpdate(userId, update, {new:true} ,(err, userUpdated) => {
        if(err) return res.status(500).send({message: 'Error en la petición'});
        if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar al usuario'});

        return res.status(200).send({
            user: userUpdated
        })
    });
}

module.exports = {
    home,
    saveUsers,
    loginUser,
    getUser,
    getUsers,
    updateUser
}