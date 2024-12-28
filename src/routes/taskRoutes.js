const express = require('express');
const router = express.Router();
const fs = require('fs');

const db = JSON.parse(fs.readFileSync(__dirname + '/../data/db.json'))

// Get all tasks
router.get('/', (req, res) => {
  res.json(db.tasks);
});

// Get task by ID
router.get('/:id', (req, res) => {
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Create new task
router.post('/', (req, res) => {
  const newTask = {
    id: `t${db.tasks.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    assignments: [],
    completionRate: 0
  };
  
  db.tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
router.patch('/:id', (req, res) => {
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
  res.json(db.tasks[taskIndex]);
});

// Delete task
router.delete('/:id', (req, res) => {
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks.splice(taskIndex, 1);
  res.status(204).send();
});

module.exports = router;