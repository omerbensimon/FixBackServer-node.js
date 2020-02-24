const mongoose = require('mongoose');
const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    resturant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'resturant',
        require: true,
    }
});

module.exports = mongoose.model('room', RoomSchema);