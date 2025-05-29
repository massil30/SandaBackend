const express = require('express');
const Reservation = require('../models/Reservation');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

// Create a new Reservation
router.post('/', authMiddleware, async (req, res) => {
    try {
        const reservation = new Reservation({ ...req.body, user_id: req.user });
        await reservation.save();
        res.status(201).send(reservation);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all Reservations for a User
router.get('/', authMiddleware, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user_id: req.user }).populate('offer_id');
        res.status(200).send(reservations);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Reservation by ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!reservation) return res.status(404).send();
        res.send(reservation);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Reservation by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).send();
        res.send(reservation);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;