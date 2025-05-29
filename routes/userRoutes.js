const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Update User Profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user, req.body, { new: true }).select('-password');
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;