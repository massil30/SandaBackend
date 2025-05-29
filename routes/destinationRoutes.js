const express = require('express');
const Destination = require('../models/Destination');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

// Create a Destination
router.post('/', authMiddleware, async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).send(destination);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Destinations
router.get('/', async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.status(200).send(destinations);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Destination by ID
router.get('/:id', async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) return res.status(404).send();
        res.send(destination);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Destination by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destination) return res.status(404).send();
        res.send(destination);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Destination by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) return res.status(404).send();
        res.send(destination);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;