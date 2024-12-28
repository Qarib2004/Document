const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Get all announcements
router.get('/', (req, res) => {
  res.json(db.announcements);
});

// Get announcement by ID
router.get('/:id', (req, res) => {
  const announcement = db.announcements.find(a => a.id === req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
  res.json(announcement);
});

// Create announcement
router.post('/', (req, res) => {
  const newAnnouncement = {
    id: `a${db.announcements.length + 1}`,
    ...req.body,
    date: new Date().toISOString()
  };
  
  db.announcements.push(newAnnouncement);
  res.status(201).json(newAnnouncement);
});

// Update announcement
router.patch('/:id', (req, res) => {
  const index = db.announcements.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Announcement not found' });

  db.announcements[index] = { ...db.announcements[index], ...req.body };
  res.json(db.announcements[index]);
});

// Delete announcement
router.delete('/:id', (req, res) => {
  const index = db.announcements.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Announcement not found' });

  db.announcements.splice(index, 1);
  res.status(204).send();
});

module.exports = router;