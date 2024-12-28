const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Get all assignments
router.get('/', (req, res) => {
  res.json(db.assignments);
});

// Get assignment by ID
router.get('/:id', (req, res) => {
  const assignment = db.assignments.find(a => a.id === req.params.id);
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
  res.json(assignment);
});

// Create assignment
router.post('/', (req, res) => {
  const newAssignment = {
    id: `a${db.assignments.length + 1}`,
    ...req.body,
    assignDate: new Date().toISOString(),
    status: 'pending'
  };
  
  db.assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

// Update assignment
router.patch('/:id', (req, res) => {
  const index = db.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Assignment not found' });

  db.assignments[index] = { ...db.assignments[index], ...req.body };
  res.json(db.assignments[index]);
});

// Delete assignment
router.delete('/:id', (req, res) => {
  const index = db.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Assignment not found' });

  db.assignments.splice(index, 1);
  res.status(204).send();
});

module.exports = router;