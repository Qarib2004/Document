const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = JSON.parse(fs.readFileSync(__dirname + '/../data/db.json'))


// Get all classes
router.get('/', (req, res) => {
  res.json(db.classes);
});

// Get class by ID
router.get('/:id', (req, res) => {
  const classItem = db.classes.find(c => c.id === req.params.id);
  if (!classItem) return res.status(404).json({ message: 'Class not found' });
  res.json(classItem);
});

// Create new class
router.post('/', (req, res) => {
  const newClass = {
    id: `c${db.classes.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  db.classes.push(newClass);
  res.status(201).json(newClass);
  
  fs.writeFile(
    path.join(__dirname, '/../data/db.json'),
    JSON.stringify(db, null, 2),  // Pretty-print the JSON with 2 spaces for readability
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: 'Could not save data to file',
        });
      }
  
});

// Update class
router.patch('/:id', (req, res) => {
  const classIndex = db.classes.findIndex(c => c.id === req.params.id);
  if (classIndex === -1) return res.status(404).json({ message: 'Class not found' });

  db.classes[classIndex] = { ...db.classes[classIndex], ...req.body };
  res.json(db.classes[classIndex]);
});

// Delete class
router.delete('/:id', (req, res) => {
  const classIndex = db.classes.findIndex(c => c.id === req.params.id);
  if (classIndex === -1) return res.status(404).json({ message: 'Class not found' });

  db.classes.splice(classIndex, 1);
  res.status(204).send();
});

module.exports = router;
