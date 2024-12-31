const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/../data/db.json');

// Veritabanını okuma
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// JSON dosyasına yazma işlemi
const saveDb = () => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
};

// Tüm davetiyeleri getir
router.get('/', (req, res) => {
  res.json(db.invitations);
});

// ID'ye göre davetiye getir
router.get('/:id', (req, res) => {
  const invitation = db.invitations.find(i => i.id === req.params.id);
  if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
  res.json(invitation);
});

// Yeni davetiye oluştur
router.post('/', (req, res) => {
  const newInvitation = {
    id: `i${db.invitations.length + 1}`,
    ...req.body,
    status: 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 gün sonra
  };

  db.invitations.push(newInvitation);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newInvitation);
});

// Davetiye durumunu güncelle
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const invitation = db.invitations.find(i => i.id === req.params.id);
  if (!invitation) return res.status(404).json({ message: 'Invitation not found' });

  invitation.status = status;
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(invitation);
});

// Davetiyeyi sil
router.delete('/:id', (req, res) => {
  const index = db.invitations.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Invitation not found' });

  db.invitations.splice(index, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

module.exports = router;
