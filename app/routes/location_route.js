const router = require('express').Router();
const LocationController = require('../controllers/locations_controller');

router.post('/addLocation', (req, res) => {
    LocationController.addLocation(req, res)
});

module.exports = router;
