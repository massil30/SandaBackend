const mongoose = require('mongoose');
const { Schema } = mongoose;

const offerSchema = new Schema({
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    departure_point: { type: String, required: true },
    available_places: { type: Number, required: true },
    duration: { type: String, required: true },
    included: { type: [String], required: true },
    not_included: { type: [String], required: true },
    agency_id: { type: Schema.Types.ObjectId, ref: 'Agency', required: true },
    destination_id: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    isPromoted: { type: Number, required: true, default: 0 },
    offerStatus: { type: Number, required: true, default: 1 }, // 1 = Active, 0 = Inactive
});

module.exports = mongoose.model('Offer', offerSchema);