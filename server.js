const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const offerRoutes = require('./routes/offerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/reservations', reservationRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});