// routes/products.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// Example: list all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
