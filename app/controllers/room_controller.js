httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const Room = require('../models/Room');
const moment = require('moment');



const viewAllRooms = async (req, res) => {
    try {
        if (req.params.resID == null) {
            obj = await Room.find({}, (err) => {
                if (err)
                    throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
            });
            if (obj.length == 0) throw {
                status: httpStatus.BAD_REQUEST, message: 'No such Room'
            }
        }
        else {
            obj = await Room.find({}, (err) => {
                if (err)
                    throw { status: httpStatus.INTERNAL_SERVER_ERROR, message: err }
            }).where('resturantID').equals(req.params.resID);
            if (obj.length == 0) throw {
                status: httpStatus.BAD_REQUEST, message: 'No such Room'
            }
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}
const viewSingleRoom = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await Room.findOne({ _id: req.params.id }, (err) => { if (err) throw err });
        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such room'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const deleteRoom = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid task id number'
        }
        obj = await Room.findOne({ _id: req.params.id }, (err) => { if (err) throw err });

        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such task'
        }
        await Room.deleteOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('Room was deleted')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};


const addRoom = async (req, res) => {
    try {
        if (!req.body.name || !req.body.resturantid) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        if (!mongoose.Types.ObjectId.isValid(req.body.resturantid)) throw { status: httpStatus.BAD_REQUEST, message: 'resturant not exists' };
        obj = Room({
            name: req.body.name,
            resturant: req.body.resturantid
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted room with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = {
    addRoom,
    deleteRoom,
    viewSingleRoom,
    viewAllRooms,
};