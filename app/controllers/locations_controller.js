
httpStatus = require('http-status-codes');
const loc = require('../models/Location');

const addLocation = async (req, res) => {
    try {
        if (!req.body.Lat || !req.body.Lon) throw { status: httpStatus.BAD_REQUEST, message: 'invalid variables' };
        obj = loc({
            Lat: req.body.lat,
            Lon: req.body.lon
        });
        await obj.save();
        res.status(httpStatus.OK).send(`Inserted location with id ${obj._id}`);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = {
    addLocation,
};