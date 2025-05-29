const mongoose = require('mongoose');
const { Schema } = mongoose;

const agencySchema = new Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    total_earned: { type: Number, required: true, default: 0 },
    taxes: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('Agency', agencySchema);