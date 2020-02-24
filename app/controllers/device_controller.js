httpStatus = require('http-status-codes');
const mongoose = require('mongoose');
const device = require('../models/Device');
const moment = require('moment');


const viewSingledevice = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await device.findOne({ _id: req.params.id }, (err) => { if (err) throw err });
        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such device'
        }
        res.status(httpStatus.OK).json(obj);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};
const deletedevice = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid id number'
        }
        obj = await device.findOne({ _id: req.params.id }, (err) => { if (err) throw err });
        if (!obj) throw {
            status: httpStatus.BAD_REQUEST, message: 'No such device'
        }
        await device.deleteOne({ _id: req.params.id });
        res.status(httpStatus.OK).send('device was deleted')
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};



const adddevice = async (req, res) => {
    try {
        if (!req.body.name || !req.body.GTIN || !req.body.room || !req.body.TechType) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        if (!mongoose.Types.ObjectId.isValid(req.body.room)) throw {
            status: httpStatus.BAD_REQUEST, message: 'Invalid room id number'
        }
        if (req.body.TechType != "General" && req.body.TechType != "AC" && req.body.TechType != "Big Appliances" && req.body.TechType != "Electrician") throw {
            status: httpStatus.BAD_REQUEST, message: 'Tech type can be only: Big Appliances, Electician, General or AC'
        }
        obj = device({
            name: req.body.name,
            GTIN: req.body.GTIN,
            room: req.body.room,
            TechType: req.body.TechType
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted device with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = {
    adddevice,
    deletedevice,
    viewSingledevice,
};