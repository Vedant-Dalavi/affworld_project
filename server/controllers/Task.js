// server/controllers/taskController.js
const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validate required fields

        console.log("inside create task")
        if (!name) {
            return res.status(400).json({ error: 'Task name is required' });
        }

        const task = await Task.create({
            name,
            description,
            status: 'pending', // Default status
            user: req.user.id // From auth middleware
        });

        await task.save();

        res.status(201).json({
            success: true,
            task: {
                _id: task._id,
                name: task.name,
                description: task.description,
                status: task.status,
                // createdAt: task.createdAt
            }
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            error: 'Error creating task',
            details: error.message
        });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        // const { taskId } = req.params;
        const { newStatus, taskId } = req.body;

        // Fields that are allowed to be updated
        const allowedUpdates = ['name', 'description', 'status'];
        const updateFields = {};



        const task = await Task.findOne({
            _id: taskId,
            user: req.user.id // Ensure user owns the task
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update task
        task.status = newStatus;
        await task.save();

        res.json({
            success: true,
            task: {
                _id: task._id,
                name: task.name,
                description: task.description,
                status: task.status,
                updatedAt: task.updatedAt
            }
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({
            error: 'Error updating task',
            details: error.message
        });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await Task.findOne({
            _id: taskId,
            user: req.user.id // Ensure user owns the task
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.deleteOne();

        res.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({
            error: 'Error deleting task',
            details: error.message
        });
    }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
            .sort({ createdAt: -1 }); // Sort by newest first

        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            error: 'Error fetching tasks',
            details: error.message
        });
    }
};

// Get a single task
exports.getTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await Task.findOne({
            _id: taskId,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error('Get task error:', error);
        res.status(500).json({
            error: 'Error fetching task',
            details: error.message
        });
    }
};
