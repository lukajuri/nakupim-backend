const express = require('express');
const router = express.Router();
const pool = require('../db'); // adjust path if your db helper lives elsewhere
const authenticateFirebaseToken = require('../middleware/auth');

router.post(
  '/register',
  authenticateFirebaseToken,
  async (req, res) => {
    const { uid, email, name } = req.firebaseUser;
    const [first_name, ...rest] = (name || '').split(' ');
    const last_name = rest.join(' ') || null;
    try {
      const result = await pool.query(
        `INSERT INTO users (id, email, first_name, last_name, role, email_verified)
         VALUES ($1, $2, $3, $4, 'customer', TRUE)
         ON CONFLICT (id) DO UPDATE
           SET first_name = EXCLUDED.first_name,
               last_name  = EXCLUDED.last_name,
               email_verified = TRUE
         RETURNING id, email, first_name, last_name`,
        [uid, email, first_name, last_name]
      );
      return res.status(201).json({ user: result.rows[0] });
    } catch (err) {
      console.error('DB error on register:', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }
);

module.exports = router;
