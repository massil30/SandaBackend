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
//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
});
//Delte User by ID
// Delete User by ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});


module.exports = router;