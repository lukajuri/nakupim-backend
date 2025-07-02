// db.js
const { Pool } = require('pg');

const dbUser = process.env.DB_USER || 'postgres';
const dbPass = process.env.DB_PASS;  // you’ll set this in Cloud Run
const dbName = process.env.DB_NAME || 'postgres';
const instanceConnectionName = process.env.INSTANCE_CONNECTION_NAME; 
  // e.g. red-provider-462609-f9:europe-west1:nakupim-postgres

const pool = new Pool({
  user: dbUser,
  password: dbPass,
  database: dbName,
  // When on Cloud Run, connect via the Unix socket at /cloudsql/<INSTANCE>
  host: `/cloudsql/${instanceConnectionName}`,  
});

module.exports = pool;
