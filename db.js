const { Pool } = require('pg');

const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME || 'postgres';

// Cloud SQL public IP (for local dev)
const localHost = process.env.DB_HOST || '34.79.27.65';

// If INSTANCE_CONNECTION_NAME is set, we’re on Cloud Run; use Unix socket.
// Otherwise, connect over TCP to the public IP.
const isCloudRun = !!process.env.INSTANCE_CONNECTION_NAME;

const pool = new Pool({
  user: dbUser,
  password: dbPass,
  database: dbName,
  host: isCloudRun
    ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
    : localHost,
  port: 5432,
});

module.exports = pool;