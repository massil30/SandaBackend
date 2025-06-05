const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    offer_id: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    status: { type: String, required: true }, // e.g., 'confirmed', 'canceled'
    fullname: { type: String, required: true },
    phone_number: { type: String, required: true },
    number_of_people: { type: Number, required: true },
    selected_date: { type: String, required: true },
    total_price: { type: Number, required: true }, // 💰 Added this field
});

module.exports = mongoose.model('Reservation', reservationSchema);
