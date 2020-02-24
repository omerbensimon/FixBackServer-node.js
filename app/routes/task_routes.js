const router = require('express').Router();
const TaskController = require('../controllers/task_controller');

router.post('/createNewTask', (req, res) => {
    TaskController.addTask(req, res)
});
router.get('/viewAllTasks/:userId/:date/:status/:resturant', (req, res) => {
    TaskController.viewAllTasks(req, res)
});
router.get('/viewSingleTask/:id', (req, res) => {
    TaskController.viewSingleTask(req, res)
});
router.delete('/deleteTask/:id', (req, res) => {
    TaskController.deleteTask(req, res)
});
router.put('/updateTask/:taskId', (req, res) => {
    TaskController.updateTask(req, res)
});
router.get('/allLogs', (req, res) => {
    TaskController.allLogs(req, res)
});

module.exports = router;