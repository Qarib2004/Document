const express = require('express');
const router = express.Router();
const db = require('../data/db');

// Get all invitations
router.get('/', (req, res) => {
  res.json(db.invitations);
});

// Get invitation by ID
router.get('/:id', (req, res) => {
  const invitation = db.invitations.find(i => i.id === req.params.id);
  if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
  res.json(invitation);
});

// Create invitation
router.post('/', (req, res) => {
  const newInvitation = {
    id: `i${db.invitations.length + 1}`,
    ...req.body,
    status: 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
  };
  
  db.invitations.push(newInvitation);
  res.status(201).json(newInvitation);
});

// Update invitation status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const invitation = db.invitations.find(i => i.id === req.params.id);
  if (!invitation) return res.status(404).json({ message: 'Invitation not found' });

  invitation.status = status;
  res.json(invitation);
});

// Delete invitation
router.delete('/:id', (req, res) => {
  const index = db.invitations.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Invitation not found' });

  db.invitations.splice(index, 1);
  res.status(204).send();
});

module.exports = router;