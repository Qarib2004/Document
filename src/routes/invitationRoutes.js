const express = require('express');
const router = express.Router();
const  Invitation  = require('../models/Invitation');

// Get all invitations
router.get('/', async (req, res) => {
  try {
    const invitations = await Invitation.find()
      .populate('classId')
      .populate('studentId', '-password');
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get invitation by ID
router.get('/:id', async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id)
      .populate('classId')
      .populate('studentId', '-password');
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
    res.json(invitation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new invitation
router.post('/', async (req, res) => {
  try {
    const invitation = new Invitation({
      ...req.body,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });
    const savedInvitation = await invitation.save();
    res.status(201).json(savedInvitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update invitation status
router.patch('/:id/status', async (req, res) => {
  try {
    const invitation = await Invitation.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
    res.json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete invitation
router.delete('/:id', async (req, res) => {
  try {
    const invitation = await Invitation.findByIdAndDelete(req.params.id);
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;