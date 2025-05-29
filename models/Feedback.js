const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    offer_id: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback_Status: { type: Number, required: true }, // e.g., 1 - visible, 0 - hidden
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', feedbackSchema);