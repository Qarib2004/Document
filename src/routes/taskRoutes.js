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
  res.json(db.tasks);
});

// ID'ye göre görev getir
router.get('/:id', (req, res) => {
  const task = db.tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

// Yeni görev oluştur
router.post('/', (req, res) => {
  const newTask = {
    id: `t${db.tasks.length + 1}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    assignments: [],
    completionRate: 0,
  };

  db.tasks.push(newTask);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newTask);
});

// Görevi güncelle
router.patch('/:id', (req, res) => {
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks[taskIndex] = { ...db.tasks[taskIndex], ...req.body };
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(db.tasks[taskIndex]);
});

// Görevi sil
router.delete('/:id', (req, res) => {
  const taskIndex = db.tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  db.tasks.splice(taskIndex, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

module.exports = router;
