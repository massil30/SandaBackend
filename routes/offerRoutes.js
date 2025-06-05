const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();

// Create a new Offer (Public)
router.post('/', async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).send(offer);
  } catch (err) {
    console.error(err); // Log error on server
    res.status(400).json({ error: err.message, details: err.errors || null });
  }
});


// Get all Offers (Public)
router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find()
            .populate('agency_id')
            .populate('destination_id');
        res.status(200).send(offers);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Offer by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id)
            .populate('agency_id')
            .populate('destination_id');
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Offer by ID (Public)
router.put('/:id', async (req, res) => {
    try {
        const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Offer by ID (Public)
router.delete('/:id', async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) return res.status(404).send();
        res.send(offer);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
