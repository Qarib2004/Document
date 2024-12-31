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

// Tüm sınıfları getir
router.get('/', (req, res) => {
  res.json(db.classes);
});

// ID'ye göre sınıf getir
router.get('/:id', (req, res) => {
  const classItem = db.classes.find(c => c.id === req.params.id);
  if (!classItem) return res.status(404).json({ message: 'Class not found' });
  res.json(classItem);
});

// Yeni sınıf oluştur
router.post('/', (req, res) => {
  const newClass = {
    id: `c${db.classes.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  db.classes.push(newClass);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newClass);
});

// Sınıfı güncelle
router.patch('/:id', (req, res) => {
  const classIndex = db.classes.findIndex(c => c.id === req.params.id);
  if (classIndex === -1) return res.status(404).json({ message: 'Class not found' });

  db.classes[classIndex] = { ...db.classes[classIndex], ...req.body };
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(db.classes[classIndex]);
});

// Sınıfı sil
router.delete('/:id', (req, res) => {
  const classIndex = db.classes.findIndex(c => c.id === req.params.id);
  if (classIndex === -1) return res.status(404).json({ message: 'Class not found' });

  db.classes.splice(classIndex, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

module.exports = router;
