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

// Tüm duyuruları getir
router.get('/', (req, res) => {
  res.json(db.announcements);
});

// ID'ye göre duyuru getir
router.get('/:id', (req, res) => {
  const announcement = db.announcements.find(a => a.id === req.params.id);
  if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
  res.json(announcement);
});

// Yeni duyuru oluştur
router.post('/', (req, res) => {
  const newAnnouncement = {
    id: `a${db.announcements.length + 1}`,
    ...req.body,
    date: new Date().toISOString(),
  };

  db.announcements.push(newAnnouncement);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newAnnouncement);
});

// Duyuruyu güncelle
router.patch('/:id', (req, res) => {
  const index = db.announcements.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Announcement not found' });

  db.announcements[index] = { ...db.announcements[index], ...req.body };
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(db.announcements[index]);
});

// Duyuruyu sil
router.delete('/:id', (req, res) => {
  const index = db.announcements.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Announcement not found' });

  db.announcements.splice(index, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

module.exports = router;
