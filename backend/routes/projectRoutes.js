const express = require('express');

const router = express.Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

const {
    createProject,
    getProjects
} = require('../controllers/projectController');

router.post('/', auth, role('Admin'), createProject);

router.get('/', auth, getProjects);

module.exports = router;