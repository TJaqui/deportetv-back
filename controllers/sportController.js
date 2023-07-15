const sportModel = require('../models/sportModel');

module.exports = class userController{
    static async getAllSports(request, response){
        try {
            const sports = await sportModel.find();
            if(sports != null){
                response.status(200).json(sports);
            }
            else{
                response.status(404).json();
            }
        } catch (error) {
            response.status(400).json({message: error.message});
        }
    }
    static async getSportByName(request, response){
        try {
            const name = request.params.name;
            const sports = await sportModel.findOne({name: name});
            if(sports != null){
                response.status(200).json(sports);
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
    static async RegistroDeporte(request, response){
        try {
            const { name, description, section } = request.body;

            const sport = new sportModel({name, description, section });
        
            sport.save((err) => {
                if (err) {
                    response.status(500).send("Error al registrar al usuario");
                } else {
                    response.status(200).send({message:"deporte registrado"});
                }
            });

        } catch (error) {
            return response.status(400).json({
                message: 'Ocurrio algo inseperado',error
            })

        }
    }
    
    
    
}
