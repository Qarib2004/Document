const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = JSON.parse(fs.readFileSync(__dirname + '/../data/db.json'))


// Get all materials
router.get('/', (req, res) => {
  res.json(db.materials);
});

// Get material by ID
router.get('/:id', (req, res) => {
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });
  res.json(material);
});

// Create material
router.post('/', (req, res) => {
  const newMaterial = {
    id: `m${db.materials.length + 1}`,
    ...req.body,
    likes: [],
    comments: []
  };
  
  db.materials.push(newMaterial);
  res.status(201).json(newMaterial);
});

// Update material
router.patch('/:id', (req, res) => {
  const index = db.materials.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Material not found' });

  db.materials[index] = { ...db.materials[index], ...req.body };
  res.json(db.materials[index]);
});

// Delete material
router.delete('/:id', (req, res) => {
  const index = db.materials.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Material not found' });

  db.materials.splice(index, 1);
  res.status(204).send();
});

// Like material
router.post('/:id/like', (req, res) => {
  const { userId } = req.body;
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });

  if (!material.likes.includes(userId)) {
    material.likes.push(userId);
  }
  res.json(material);
});

// Add comment
router.post('/:id/comments', (req, res) => {
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });

  const newComment = {
    id: `c${material.comments.length + 1}`,
    ...req.body,
  };
  
  material.comments.push(newComment);
  res.status(201).json(newComment);
});

module.exports = router;