const express = require('express');
const router = express.Router();

// GET /api/sales
router.get('/', (req, res) => {
  res.json({ message: 'Lista de ventas' });
});

// GET /api/sales/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Venta ${req.params.id}` });
});

// POST /api/sales
router.post('/', (req, res) => {
  res.json({ message: 'Venta registrada' });
});

module.exports = router; 