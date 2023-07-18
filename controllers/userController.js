const userModel = require('../models/userModel');

module.exports = class userController{
    static async getAllusers(request, response){
        try {
            const users = await userModel.find();
            if(users != null){
                response.status(200).json(users);
            }
            else{
                response.status(404).json();
            }
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }
    static async getUserByUserName(request, response){
        try {
            const username = request.params.username;
            const users = await userModel.findOne({username: username});
            if(users != null){
                response.status(200).json(users);
            }
            else{
                response.status(404).json();
            }

        } catch (error) {
            return response.status(400).json({
                message: 'Ocurrio algo inseperado',error
            })

        }
    }
    static async Registro(request, response){
        try {
            
            const { firstname, lastname, email, password, role } = request.body;
            
            const user = new userModel({firstname, lastname, email, password, role });
        
            user.save((err) => {
                if (err) {
                    response.status(500).send("Error al registrar al usuario");
                } else {
                    response.status(200).send({message:"Usuario registrado"});
                }
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Ocurrio algo inseperado',error
            })

        }
    }
    
    static async autenticar(request, response){
        try {
            const { email, password } = request.body;
            
            userModel.findOne({ email }, (err, user) => {
                if (err) {
                    response.status(500).send("Error al autenticar al usuario");
                } else if (!user) {
                    response.status(404).send("El usuario no existe");
                } else {
                    user.isCorrectPassword(password, (err, result) => {
                        if (err) {
                            response.status(500).send("Error al autenticar");
                        } else if (result) {
                            response.status(200).send({message:"Usuario autenticado correctamente", user});
                        } else {
                            response.status(500).send("Usuario y/o contraseña incorrecto");
                        }
                    });
                }
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Ocurrio algo inseperado',error
            })

        }
    }

    
    
}
