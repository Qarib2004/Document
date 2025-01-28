const express = require('express');
const router = express.Router();
const  Assignment  = require('../models/Assignment');

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('taskId')
      .populate('studentId', '-password');
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('taskId')
      .populate('studentId', '-password');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new assignment
router.post('/', async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    const savedAssignment = await assignment.save();
    res.status(201).json(savedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update assignment
router.patch('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;