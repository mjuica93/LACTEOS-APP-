const express = require('express');
const router = express.Router();

// GET /api/presentations
router.get('/', (req, res) => {
  res.json({ message: 'Lista de presentaciones' });
});

// GET /api/presentations/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Presentación ${req.params.id}` });
});

// POST /api/presentations
router.post('/', (req, res) => {
  res.json({ message: 'Presentación creada' });
});

// POST /api/presentations/:id/generate-pdf
router.post('/:id/generate-pdf', (req, res) => {
  res.json({ message: `PDF generado para presentación ${req.params.id}` });
});

module.exports = router; 