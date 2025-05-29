const mongoose = require('mongoose');
const { Schema } = mongoose;

const destinationSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
});

module.exports = mongoose.model('Destination', destinationSchema);