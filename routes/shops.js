// routes/shops.js
const express = require('express');
const pool = require('../db');
const router = express.Router();

// Example: list all shops
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM shops');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching shops:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
