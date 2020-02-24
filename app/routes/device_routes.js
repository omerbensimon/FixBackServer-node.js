const router = require('express').Router();
const deviceController = require('../controllers/device_controller');

router.post('/adddevice', (req, res) => {
    deviceController.adddevice(req, res)
});
router.get('/viewSingledevice/:id', (req, res) => {
    deviceController.viewSingledevice(req, res)
});
router.delete('/deletedevice/:id', (req, res) => {
    deviceController.deletedevice(req, res)
});

module.exports = router;