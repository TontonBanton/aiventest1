const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err); // Log the full error
    res.status(500).json({ error: err.message }); // Send error message to the client
  }
});

module.exports = router;
