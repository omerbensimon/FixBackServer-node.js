const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    GTIN: {
        type: String,
        require: true,
    },
    TechType: {
        type: String,
        enum: ['AC', 'Electrician', 'Big Appliances', 'General'],
        require: true
    },
    room: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'room'
    }
});

module.exports = mongoose.model('device', DeviceSchema);