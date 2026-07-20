const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');

dotenv.config();

const seedData = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/teamtaskmanager';
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing collections
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});

        console.log('Cleared existing data.');

        // Hash passwords
        const adminPassword = await bcrypt.hash('admin123', 10);
        const memberPassword = await bcrypt.hash('member123', 10);

        // Create Users
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

        const member2 = await User.create({
            name: 'Sam Wilson',
            email: 'sam@example.com',
            password: memberPassword,
            role: 'Member'
        });

        console.log('Users created: Admin (admin@example.com / admin123), Members (alex@example.com, sam@example.com / member123)');

        // Create Projects
        const project1 = await Project.create({
            title: 'Website Redesign',
            description: 'Overhaul the corporate website with modern React components, responsive layouts, and performance optimization.',
            createdBy: admin._id,
            members: [member1._id, member2._id]
        });

        const project2 = await Project.create({
            title: 'Mobile App API Integration',
            description: 'Build robust REST APIs for authentication, real-time push notifications, and data synchronization.',
            createdBy: admin._id,
            members: [member1._id]
        });

        console.log('Projects created: Website Redesign, Mobile App API Integration');

        // Create Tasks
        await Task.create([
            {
                title: 'Design Dashboard UI Mockups',
                description: 'Create high-fidelity responsive UI component layouts for dashboard cards and task filter widgets.',
                status: 'Completed',
                dueDate: new Date(Date.now() + 86400000 * 3),
                project: project1._id,
                assignedTo: member1._id
            },
            {
                title: 'Implement JWT Auth Middleware',
                description: 'Set up secure bearer token authentication middleware and route protection in Express server.',
                status: 'In Progress',
                dueDate: new Date(Date.now() + 86400000 * 5),
                project: project2._id,
                assignedTo: member1._id
            },
            {
                title: 'Database Schema Optimization',
                description: 'Add index coverage for user query filters and populate reference definitions across collections.',
                status: 'Pending',
                dueDate: new Date(Date.now() + 86400000 * 7),
                project: project1._id,
                assignedTo: member2._id
            },
            {
                title: 'Frontend State Management Review',
                description: 'Verify React component state flow, localStorage persistence, and API interceptors error handling.',
                status: 'Pending',
                dueDate: new Date(Date.now() + 86400000 * 2),
                project: project1._id,
                assignedTo: admin._id
            }
        ]);

        console.log('Tasks created successfully.');
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
