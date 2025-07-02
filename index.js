const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using Application Default Credentials
// Cloud Run’s service account will be used automatically
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const authenticateFirebaseToken = require('./middleware/auth');

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Public auth routes (we'll add register here soon)
app.use('/api/auth', require('./routes/auth'));

// Protect everything that follows
app.use('/api/shops', authenticateFirebaseToken, require('./routes/shops'));
app.use('/api/products', authenticateFirebaseToken, require('./routes/products'));
// …add more as you build them

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});