const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    sex: { type: String },
city: { type: String }, 
    preferences: { type: [String], default: [] },   
    points: { type: Number, default: 0 },
    can_comment: { type: Number, default: 0 },
});

// Password hashing before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method for password matching
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
