const express = require('express');
const router = express.Router();
const  User  = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/auth');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await hashPassword(password);
    
    const user = new User({
      ...userData,
      password: hashedPassword
    });

    const savedUser = await user.save();
    const { password: _, ...userResponse } = savedUser.toObject();
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.patch('/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    if (password) {
      updateData.password = await hashPassword(password);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, select: '-password' }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
