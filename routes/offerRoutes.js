const express = require('express');
const Offer = require('../models/Offer');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

// Create a new Offer
router.post('/', authMiddleware, async (req, res) => {
    try {
        const offer = new Offer(req.body);
        await offer.save();
        res.status(201).send(offer);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Offers
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find().populate('agency_id').populate('destination_id');
        res.status(200).send(offers);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Offer by ID
router.get('/:id', async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id).populate('agency_id').populate('destination_id');
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Offer by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Offer by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;