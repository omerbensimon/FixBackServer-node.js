const router = require('express').Router();
const UserController = require('../controllers/user_controller');
router.post('/addUser', (req, res) => {
    UserController.addUser(req, res)
});
router.get('/viewAllUsers', (req, res) => {
    UserController.viewAllUsers(req, res)
});
router.get('/viewSingleUser/:id', (req, res) => {
    UserController.viewSingleUser(req, res)
});
router.delete('/deleteUser/:id', (req, res) => {
    UserController.deleteUser(req, res)
});
router.get('/GetAllAvailibleTech', (req, res) => {
    UserController.GetAllAvailibleTech(req, res)
});

router.put('/UpdateStatus/:id', (req, res) => {
    UserController.updateStatus(req, res)
});
router.get('/userToken', (req, res) => {
    UserController.authUser(req, res)
});
router.put('/Location', (req, res) => {
    UserController.updateLocation(req, res)
});

module.exports = router;