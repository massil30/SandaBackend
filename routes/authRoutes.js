const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { generateToken } = require('../config/auth');
const router = express.Router();

// In-memory store for OTPs with expiration
const otpStore = new Map();

// Mailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'massb3016@gmail.com',
    pass: 'qryw lzjb lhld hdea', // Application-specific password
  },
});

// Helper: send email
const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: 'massb3016@gmail.com',
    to: email,
    subject: 'Your OTP Code - qqSanda',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Signup Route
router.post('/signup', async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send('User already exists');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // valid for 10 minutes
  });

  try {
    await sendOTP(email, otp);
    res.status(200).send('OTP sent to your email');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || 'Failed to send OTP');
  }
});

// OTP Verification Route
router.post('/verify', async (req, res) => {
  const { full_name,email,  phone_number, password, age, sex ,otp} = req.body;

  const stored = otpStore.get(email);

  if (!stored || stored.otp !== otp) {
    return res.status(400).send('Invalid or expired OTP');
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return res.status(400).send('OTP expired');
  }

  // OTP is valid, create user
try {
  const user = await User.create({ full_name,email, phone_number, password, age, sex });
  otpStore.delete(email);
  res.status(201).json({
    _id: user._id,
    phone_number: user.phone_number,
    token: generateToken(user._id),
  });
} catch (err) {
  console.error('Error creating user:', err);
  res.status(500).send(`User creation failed: ${err.message}`);
}
});

// Login Route
router.post('/login', async (req, res) => {
  const { phone_number, password } = req.body;

  const user = await User.findOne({ phone_number });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      phone_number: user.phone_number,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
