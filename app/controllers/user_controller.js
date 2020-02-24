const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/User');
const moment = require('moment');
var Enum = require('enum');

async function updateLocation(req, res) {
    try {
        const loggedInUser = await getAuthenticatedUser(req.cookies.Token);
        if (!loggedInUser)
            throw { status: httpStatus.UNAUTHORIZED, message: "You need to be logged in" };


        if (!req.body.lat || !req.body.lon) throw {
            status: httpStatus.BAD_REQUEST, message: 'Bad params'
        }

        await Users.updateOne({ _id: loggedInUser._id }, { position: { lat: req.body.lat, lon: req.body.lon } });
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
async function getAuthenticatedUser(token) {
    if (!token) return undefined;
    try {
        const authedUser = await User.findOne({ Token: token });
        return authedUser;
    } catch (error) {
        return undefined;
    }
}

const authUser = async (req, res) => {
    try {
        const obj = await User.find({ email: req.query.email }, (err) => { if (err) throw err });

        if (obj.length > 0 && bcrypt.compareSync(req.query.password, obj[0].password)) {


            res.cookie("Token", obj[0].Token);
            res.send(obj[0]);
        } else {
            throw {
                status: httpStatus.UNAUTHORIZED, message: 'Login failed'
            }
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


const deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid task id number'
        }
        obj = await User.findOne({ _id: req.params.id }, (err) => { if (err) throw err });
        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such task'
        }
        await User.deleteOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('user was deleted')
    } catch (err) {
        res.status(err.status).send(err.message);
    }

};

const viewAllUsers = async (req, res) => {
    try {
        const loggedInUser = await getAuthenticatedUser(req.cookies.Token);
        if (!loggedInUser)
            throw { status: httpStatus.UNAUTHORIZED, message: "You need to be logged in" };

        obj = await User.find({}, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        });
        if (obj.length == 0) throw {
            status: httpStatus.BAD_REQUEST, message: 'No users'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
const viewSingleUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await User.findOne({ _id: req.params.id }, (err) => { if (err) throw err });
        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such user'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const addUser = async (req, res) => {
    try {
        if (!req.body.name) throw { status: httpStatus.BAD_REQUEST, message: 'name is required' };
        var url = req.body.imageURL
        var spec = req.body.speciality
        var resID_forManagers = req.body.resturantID
        if (!url) {

            url = "https://www.diplomacy.edu/sites/all/themes/jollyany/demos/no-avatar.jpg"

        }
        if (!spec) {
            spec = "General"

        }

        if (!resID_forManagers) {
            restID = null;

        }

        const salt = bcrypt.genSaltSync();
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        // login token generation
        var token = makeid(64);

        var lon = lat = 0;
        // if(req.body.Role == "Technician") {
        if (true) {
            const UPPER_RIGHT_CORENT = [32.0863166, 34.7940094];
            const BOTTOM_LEFT_CORENT = [32.0586735, 34.7747323];

            lat = (Math.random() * (UPPER_RIGHT_CORENT[0] - BOTTOM_LEFT_CORENT[0]) + BOTTOM_LEFT_CORENT[0]).toFixed(7);
            lon = (Math.random() * (UPPER_RIGHT_CORENT[1] - BOTTOM_LEFT_CORENT[1]) + BOTTOM_LEFT_CORENT[1]).toFixed(7);
        }

        Obj = User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            Token: token,
            PhoneNumber: req.body.PhoneNumber,
            imageURL: url,
            Role: req.body.Role, //Shouldn't validate- client side will send at least one role
            DetailsTech: {//when opened, Tech rating will be set to 3 as a deafult value as set in the schema
                speciality: spec
            },
            DetailsManager: restID,
            position: {
                lat, lon
            }
        });
        await Obj.save();
        res.status(httpStatus.OK).send("new user was created")
    }
    catch (err) {
        if (err.code == 11000)
            res.status(400).send({ message: "mail is already in use" })
        else return { message: "unkown error" };

    }
}

const GetAllAvailibleTech = async (req, res) => {//Recieves Resturant position from client side within the req
    try {
        obj = await User.find({}, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        }).where('Role').equals('Technician').where('statusOn').equals('true');

        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

const updateStatus = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }

        obj_ = await User.findOne({ _id: req.params.id }, (err) => {
            if (err)
                throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
        });
        if (!obj_) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such user'
        }
        obj = obj_;
        if (obj.statusOn == false) {
            obj.statusOn = true;
        }
        else {
            obj.statusOn = false;

        }
        await User.updateOne({ _id: req.params.id }, obj);
        res.status(httpStatus.OK).send('User status was updated')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
module.exports = {
    addUser,
    deleteUser,
    viewSingleUser,
    viewAllUsers,
    GetAllAvailibleTech,
    updateStatus,
    authUser,
    updateLocation
};