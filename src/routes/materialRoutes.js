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

// Tüm materyalleri getir
router.get('/', (req, res) => {
  res.json(db.materials);
});

// ID'ye göre materyal getir
router.get('/:id', (req, res) => {
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });
  res.json(material);
});

// Yeni materyal oluştur
router.post('/', (req, res) => {
  const newMaterial = {
    id: `m${db.materials.length + 1}`,
    ...req.body,
    likes: [],
    comments: [],
  };

  db.materials.push(newMaterial);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newMaterial);
});

// Materyali güncelle
router.patch('/:id', (req, res) => {
  const index = db.materials.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Material not found' });

  db.materials[index] = { ...db.materials[index], ...req.body };
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.json(db.materials[index]);
});

// Materyali sil
router.delete('/:id', (req, res) => {
  const index = db.materials.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Material not found' });

  db.materials.splice(index, 1);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(204).send();
});

// Materyali beğen
router.post('/:id/like', (req, res) => {
  const { userId } = req.body;
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });

  if (!material.likes.includes(userId)) {
    material.likes.push(userId);
    saveDb(); // Değişiklikleri JSON dosyasına kaydet
  }
  res.json(material);
});

// Yorum ekle
router.post('/:id/comments', (req, res) => {
  const material = db.materials.find(m => m.id === req.params.id);
  if (!material) return res.status(404).json({ message: 'Material not found' });

  const newComment = {
    id: `c${material.comments.length + 1}`,
    ...req.body,
  };

  material.comments.push(newComment);
  saveDb(); // Değişiklikleri JSON dosyasına kaydet
  res.status(201).json(newComment);
});

module.exports = router;
