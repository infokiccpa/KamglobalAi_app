require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/waitlist', require('./routes/waitlistRoutes'));

// Basic Routes
app.get('/', (req, res) => {
    res.send('KamGlobal AI API is running...');
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend is healthy and reachable'
    });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log('Backend ready for Apply Now features');
});
