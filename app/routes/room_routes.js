const router = require('express').Router();
const roomController = require('../controllers/room_controller');

router.post('/addRoom', (req, res) => {
    roomController.addRoom(req, res)
});

//if there is a resturant ID within the req params- it will display only the rooms that are within the resturant
router.get('/viewAllRooms', (req, res) => {
    roomController.viewAllRooms(req, res)
});

router.get('/viewSingleRoom/:id', (req, res) => {
    roomController.viewSingleRoom(req, res)
});
router.delete('/deleteRoom/:id', (req, res) => {
    roomController.deleteRoom(req, res)
});

module.exports = router;