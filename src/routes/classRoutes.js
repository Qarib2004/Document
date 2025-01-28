const express = require('express');
const router = express.Router();
const  Class  = require('../models/Class');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacherId', '-password')
      .populate('studentIds', '-password');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get class by ID
router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('teacherId', '-password')
      .populate('studentIds', '-password');
    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new class
router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update class
router.patch('/:id', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) return res.status(404).json({ message: 'Class not found' });
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete class
router.delete('/:id', async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) return res.status(404).json({ message: 'Class not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;