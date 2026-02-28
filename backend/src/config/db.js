const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: MongoDB connection failed - ${error.message}`);
        console.log('Server continuing without database (limited functionality)');
    }
};

module.exports = connectDB;
