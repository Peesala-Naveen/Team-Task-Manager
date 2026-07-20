const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const project = await Project.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.getProjects = async (req, res) => {
    try {
        let projects;

        if (req.user.role === 'Admin') {
            projects = await Project.find()
                .populate('createdBy', 'name')
                .populate('members', 'name email');
        } else {
            projects = await Project.find({
                $or: [
                    { members: req.user.id },
                    { members: { $exists: true, $size: 0 } },
                    { createdBy: req.user.id }
                ]
            })
                .populate('createdBy', 'name')
                .populate('members', 'name email');
        }

        res.json(projects);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};