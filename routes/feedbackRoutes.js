const express = require('express');
const Feedback = require('../models/Feedback');
const { authMiddleware } = require('../config/auth');
const router = express.Router();

// Create Feedback
router.post('/', authMiddleware, async (req, res) => {
    try {
        const feedback = new Feedback({ ...req.body, user_id: req.user });
        await feedback.save();
        res.status(201).send(feedback);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Feedback for an Offer
router.get('/:offerId', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ offer_id: req.params.offerId, feedback_Status: 1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Feedback status
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) return res.status(404).send();
        res.send(feedback);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Feedback
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).send();
        res.send(feedback);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;