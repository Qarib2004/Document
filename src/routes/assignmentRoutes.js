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

// Tüm görevleri getir
router.get('/', (req, res) => {
  res.json(db.assignments);
});

// ID'ye göre görev getir
router.get('/:id', (req, res) => {
  const assignment = db.assignments.find(a => a.id === req.params.id);
  if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
  res.json(assignment);
});

// Yeni görev oluştur
router.post('/', (req, res) => {
  const newAssignment = {
    id: `a${db.assignments.length + 1}`,
    ...req.body,
    assignDate: new Date().toISOString(),
    status: 'submitted',
  };

  db.assignments.push(newAssignment);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newAssignment);
});

// Görevi güncelle
router.patch('/:id', (req, res) => {
  const index = db.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Assignment not found' });

  db.assignments[index] = { ...db.assignments[index], ...req.body };
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(db.assignments[index]);
});

// Görevi sil
router.delete('/:id', (req, res) => {
  const index = db.assignments.findIndex(a => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Assignment not found' });

  db.assignments.splice(index, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

module.exports = router;
