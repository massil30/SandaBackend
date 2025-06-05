const express = require('express');
const Agency = require('../models/Agency');
const router = express.Router();

// Create an Agency (Public)
router.post('/', async (req, res) => {
    try {
        const agency = new Agency(req.body);
        await agency.save();
        res.status(201).send(agency);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Agencies (Public)
router.get('/', async (req, res) => {
    try {
        const agencies = await Agency.find();
        res.status(200).send(agencies);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Agency by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const agency = await Agency.findById(req.params.id);
        if (!agency) return res.status(404).send();
        res.send(agency);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Agency by ID (Public)
router.put('/:id', async (req, res) => {
    try {
        const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agency) return res.status(404).send();
        res.send(agency);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Agency by ID (Public)
router.delete('/:id', async (req, res) => {
    try {
        const agency = await Agency.findByIdAndDelete(req.params.id);
        if (!agency) return res.status(404).send();
        res.send(agency);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
