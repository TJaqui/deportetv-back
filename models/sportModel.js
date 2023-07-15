const mongoose = require("mongoose")

const sportSchema = new mongoose.Schema({
    name: String,
    description: String,
    api: String,
    section:{
        match: {
            title:String,
            image: String,
            description: String
        },
        championship: {
            title:String,
            image: String,
            description: String
        },
        players:{
            title:String,
            image: String,
            description: String
        }
    }
})

module.exports = mongoose.model('sport', sportSchema);