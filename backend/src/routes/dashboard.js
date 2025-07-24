const express = require('express');
const router = express.Router();

// GET /api/dashboard/stats
router.get('/stats', (req, res) => {
  res.json({
    totalProducts: 24,
    activeClients: 12,
    presentations: 8,
    monthlySales: 15420
  });
});

// GET /api/dashboard/sales-chart
router.get('/sales-chart', (req, res) => {
  res.json({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [12000, 13500, 14200, 14800, 15200, 15420]
  });
});

module.exports = router; 