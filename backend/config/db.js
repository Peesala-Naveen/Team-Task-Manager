const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/teamtaskmanager';
        const conn = await mongoose.connect(connStr, {
            serverSelectionTimeoutMS: 5000
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Please ensure local MongoDB is running at mongodb://127.0.0.1:27017/teamtaskmanager');
    }
};

module.exports = connectDB;