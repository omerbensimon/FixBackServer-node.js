
const mongoose = require('mongoose');

const User = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name required"]
    },
    email: {
        type: String,
        require: [true, 'Email Required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Password Required'],

    },
    statusOn: {
        type: Boolean,
        default: false
    },
    position:
    {
        lat: Number,
        default: 0,
        lon: Number,
        default: 0,

    },

    PhoneNumber: {
        type: String,
        require: [true, 'Phone number Required'],
    },
    imageURL: {
        type: String,
    },

    Role: {
        type: String,
        enum: ['Resturant Manager', 'Manager', 'Technician'],
        require: [true],
    },
    DetailsTech: {
        systemRating: {
            type: Number,
            default: 3.0
        },
        speciality: {
            type: String,
            enum: ['AC', 'Electrician', 'Big Appliances', 'General'],
        },
        DetailsManager: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'resturant'
        }
    },
    Token: {
        type: String, min: 64
    }
});
module.exports = mongoose.model('users', User);