const express = require('express');
const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  res.json({ message: 'Lista de productos' });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Producto ${req.params.id}` });
});

// POST /api/products
router.post('/', (req, res) => {
  res.json({ message: 'Producto creado' });
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  res.json({ message: `Producto ${req.params.id} actualizado` });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  res.json({ message: `Producto ${req.params.id} eliminado` });
});

module.exports = router; 