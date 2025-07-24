const express = require('express');
const router = express.Router();

// GET /api/clients
router.get('/', (req, res) => {
  res.json({ message: 'Lista de clientes' });
});

// GET /api/clients/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Cliente ${req.params.id}` });
});

// POST /api/clients
router.post('/', (req, res) => {
  res.json({ message: 'Cliente creado' });
});

// PUT /api/clients/:id
router.put('/:id', (req, res) => {
  res.json({ message: `Cliente ${req.params.id} actualizado` });
});

// DELETE /api/clients/:id
router.delete('/:id', (req, res) => {
  res.json({ message: `Cliente ${req.params.id} eliminado` });
});

module.exports = router; 