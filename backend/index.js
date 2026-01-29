require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const User = require('./models/User');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================
   Middleware
===================== */
app.use(express.json());
app.use(cors());

/* =====================
   MongoDB Connection
===================== */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) =>
    console.error('❌ MongoDB connection error:', err.message)
  );

/* =====================
   Health Check (IMPORTANT)
===================== */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

/* =====================
   Auth Routes
===================== */

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Registration failed',
      error: error.message,
    });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
});

/* =====================
   Booking Routes
===================== */

// Create Booking (matches Book.js)
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, studyArea, timeSpent, date, time } = req.body;

    if (!name || !email || !studyArea || !timeSpent || !date || !time) {
      return res.status(400).json({
        error: 'All booking fields are required',
      });
    }

    const parsedTimeSpent = parseInt(timeSpent);
    const price = parsedTimeSpent * 5;

    const booking = new Booking({
      name,
      email,
      studyArea,
      timeSpent: parsedTimeSpent,
      date,
      time,
      price,
    });

    await booking.save();

    res.status(201).json({
      message: 'Reservation successful',
      price,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Booking failed',
      details: error.message,
    });
  }
});

/* =====================
   Server Start
===================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
