const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Create Feedback (Public)
router.post('/', async (req, res) => {
    try {
        const feedback = new Feedback(req.body); // Removed user_id from req.user
        await feedback.save();
        res.status(201).send(feedback);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get Feedback for an Offer (Public)
router.get('/:offerId', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ offer_id: req.params.offerId, feedback_Status: 1 });
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Feedback status (Public)
router.put('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) return res.status(404).send();
        res.send(feedback);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete Feedback (Public)
router.delete('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).send();
        res.send(feedback);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
