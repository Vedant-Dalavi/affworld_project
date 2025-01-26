const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTask
} = require('../controllers/Task');

// All routes require authentication
router.use(auth);

// Get all tasks
router.get('/', getTasks);

// Get single task
router.get('/:taskId', getTask);

// Create new task
router.post('/task-create', createTask);

// Update task
router.patch('/task-update', updateTask);

// Delete task
router.delete('/task-delete', deleteTask);

module.exports = router;