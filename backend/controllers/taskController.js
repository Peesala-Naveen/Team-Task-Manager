const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({
                message: 'Only Admin can create tasks'
            });
        }

        const task = await Task.create(req.body);

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getTasks = async (req, res) => {
    try {
        let tasks;

        if (req.user.role === 'Admin') {
            tasks = await Task.find()
                .populate('assignedTo', 'name')
                .populate('project', 'title');
        } else {
            tasks = await Task.find({
                assignedTo: req.user.id
            })
                .populate('assignedTo', 'name')
                .populate('project', 'title');
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        )
            .populate('assignedTo', 'name')
            .populate('project', 'title');

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};