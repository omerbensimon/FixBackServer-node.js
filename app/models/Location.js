const mongoose = require('mongoose');
const LocationSchema = mongoose.Schema({
    Lat: {
        type: Number,
        require: true,
        defult: 0
    },

    Lon: {
        type: Number,
        require: true,
        defult: 0,
    },
})

module.exports = mongoose.model('location', LocationSchema)