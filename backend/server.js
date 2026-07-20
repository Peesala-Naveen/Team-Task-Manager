const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

dotenv.config();

connectDB().then(async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount === 0) {
            console.log('Database empty. Initializing sample seed data...');
            const adminPassword = await bcrypt.hash('admin123', 10);
            const memberPassword = await bcrypt.hash('member123', 10);

            const admin = await User.create({
                name: 'Admin User',
                email: 'admin@example.com',
                password: adminPassword,
                role: 'Admin'
            });

            const member1 = await User.create({
                name: 'Alex Johnson',
                email: 'alex@example.com',
                password: memberPassword,
                role: 'Member'
            });

            const project1 = await Project.create({
                title: 'Website Redesign',
                description: 'Overhaul corporate website with modern components and responsive dashboard.',
                createdBy: admin._id,
                members: [member1._id]
            });

            await Task.create([
                {
                    title: 'Design Dashboard Mockup',
                    description: 'Create responsive UI components for statistics and task lists.',
                    status: 'Completed',
                    dueDate: new Date(Date.now() + 86400000 * 3),
                    project: project1._id,
                    assignedTo: member1._id
                },
                {
                    title: 'Backend API Integration',
                    description: 'Connect REST endpoints for projects and task management.',
                    status: 'In Progress',
                    dueDate: new Date(Date.now() + 86400000 * 5),
                    project: project1._id,
                    assignedTo: member1._id
                },
                {
                    title: 'Database Indexing',
                    description: 'Optimize collections query speeds.',
                    status: 'Pending',
                    dueDate: new Date(Date.now() + 86400000 * 7),
                    project: project1._id,
                    assignedTo: admin._id
                }
            ]);
            console.log('Sample data auto-seeded successfully!');
        }
    } catch (e) {
        console.log('Auto-seed check note:', e.message);
    }
});

const app = express();

const allowedOrigins = process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
    : '*';

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
    res.send('Team Task Manager API Running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});