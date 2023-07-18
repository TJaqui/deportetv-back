const mongoose = require("mongoose")

const sportSchema = new mongoose.Schema({
    name: String,
    description: String,
    api: String,
    image: String,
    section:{
        match: {
            title:String,
            image: String,
            description: String,
            slug: String
        },
        championship: {
            title:String,
            image: String,
            description: String,
            slug: String
        },
        players:{
            title:String,
            image: String,
            description: String,
            slug: String
        }
    }
})

module.exports = mongoose.model('sport', sportSchema);