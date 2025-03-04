const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');  // User model
const Staff = require('./models/staff');  // Staff model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Staff Management System Backend is Running!');
});

// Register route (user registration without encryption)
app.post('/api/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).send('Email or Username already exists');
    }

    // Create new user
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(400).send('Error registering user');
  }
});

// Login route (with plain text password comparison)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Compare entered password with the stored plain text password
    if (user.password === password) {
      res.json({ message: 'Login successful', user });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
});

// Staff Schema for performance and attendance tracking
const staffSchema = new mongoose.Schema({
  name: String,
  role: String,
  performanceScore: Number,
  attendance: Number,
});

const Staff = mongoose.model('Staff', staffSchema);

// Get all staff
app.get('/api/staff', async (req, res) => {
  try {
    const staff = await Staff.find();  // Fetch staff data
    res.json(staff);  // Send staff data to frontend
  } catch (err) {
    res.status(500).send('Error retrieving staff');
  }
});

// Add new staff
app.post('/api/staff', async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).send('Error adding new staff');
  }
});

// Update staff
app.put('/api/staff/:id', async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedStaff) {
      res.json(updatedStaff);
    } else {
      res.status(404).send('Staff not found');
    }
  } catch (err) {
    res.status(400).send('Error updating staff');
  }
});

// Delete staff
app.delete('/api/staff/:id', async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (staff) {
      res.status(204).send();
    } else {
      res.status(404).send('Staff not found');
    }
  } catch (err) {
    res.status(400).send('Error deleting staff');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
