const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Create a new Reservation (Public)
router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body); // Removed user_id injection
        await reservation.save();
        res.status(201).send(reservation);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Reservations (Public)
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('offer_id');
        res.status(200).send(reservations);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Reservation by ID (Public)
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) return res.status(404).send();
        res.send(reservation);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Reservation by ID (Public)
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).send();
        res.send(reservation);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
