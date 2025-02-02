const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory data storage
let staff = [
  { id: "1", name: "John Doe", role: "Manager" },
  { id: "2", name: "Jane Smith", role: "Developer" },
];

// Basic route
app.get('/', (req, res) => {
  res.send('Staff Management System Backend is Running!');
});

// Get all staff
app.get('/api/staff', (req, res) => {
  res.json(staff);  // Send the staff data to frontend
});

// Add new staff
app.post('/api/staff', (req, res) => {
  const newStaff = { id: Date.now().toString(), ...req.body };
  staff.push(newStaff);
  res.status(201).json(newStaff);
});

// Update staff
app.put('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const updatedStaff = req.body;
  const index = staff.findIndex((s) => s.id === id);
  if (index !== -1) {
    staff[index] = { ...staff[index], ...updatedStaff };
    res.json(staff[index]);
  } else {
    res.status(404).send('Staff not found');
  }
});

// Delete staff
app.delete('/api/staff/:id', (req, res) => {
  const { id } = req.params;
  const index = staff.findIndex((s) => s.id === id);
  if (index !== -1) {
    staff.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Staff not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
