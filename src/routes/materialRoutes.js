const express = require('express');
const router = express.Router();
const  Material  = require('../models/Material');

// Get all materials
router.get('/', async (req, res) => {
  try {
    const materials = await Material.find()
      .populate('likes', '-password')
      .populate('comments.userId', '-password');
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get material by ID
router.get('/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
      .populate('likes', '-password')
      .populate('comments.userId', '-password');
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new material
router.post('/', async (req, res) => {
  try {
    const material = new Material(req.body);
    const savedMaterial = await material.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update material
router.patch('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete material
router.delete('/:id', async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like material
router.post('/:id/like', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });

    const { userId } = req.body;
    if (!material.likes.includes(userId)) {
      material.likes.push(userId);
      await material.save();
    }
    res.json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add comment
router.post('/:id/comments', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).json({ message: 'Material not found' });

    material.comments.push(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;