const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    Description: {
        type: String,
        require: true,
    },
    Date: {
        type: String

    },
    FromTime: {
        type: String
    },
    ToTime: {
        type: String
    },
    FixNow: {
        type: Boolean,
        default: false,
        updatedTimeTrue: null
    },
    Resturant: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'resturant',
        require: true
    },
    device: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'device',
        require: true
    },
    OpenedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user',
        require: true
    },
    OpenedAtTime: {
        type: String,
        require: true
    },
    AssignedTech: {
        type: [mongoose.Schema.Types.ObjectId],//TODO: validate only technicians 
        ref: 'UserSchema'
    },
    Urgency: {
        type: String,
        enum: ['High', 'Medium', 'Low']
    },
    StatusTech: {
        type: String,
        enum: ['Opened', 'Closed']
    },
    StatusManager: {
        type: String,
        enum: ['To do', 'Awaits', 'Booked', 'In progress', 'Closed'],
        default: 'To do'
    }
}, {
});

module.exports = mongoose.model('task', TaskSchema);