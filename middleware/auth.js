const admin = require('firebase-admin');

async function authenticateFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const idToken = match[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.firebaseUser = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null,
    };
    return next();
  } catch (err) {
    console.error('Firebase token verification failed:', err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = authenticateFirebaseToken;
