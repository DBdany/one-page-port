import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.POSTGRES_SSL === 'false' ? false : { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
});

let tableInitialized = false;

// Initialize the guestbook table if it doesn't exist
export async function initGuestbookTable() {
  if (tableInitialized) return;
  
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS guestbook (
        id SERIAL PRIMARY KEY,
        nickname VARCHAR(50),
        message VARCHAR(100) NOT NULL,
        sticker VARCHAR(50),
        name_color VARCHAR(7) DEFAULT '#c4b5fd',
        ip_hash VARCHAR(64) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    // Add color columns if they don't exist (for existing tables)
    await client.query(`
      ALTER TABLE guestbook ADD COLUMN IF NOT EXISTS name_color VARCHAR(7) DEFAULT '#c4b5fd';
    `);
    await client.query(`
      ALTER TABLE guestbook ADD COLUMN IF NOT EXISTS message_color VARCHAR(7) DEFAULT '#ffffff';
    `);
    tableInitialized = true;
  } finally {
    client.release();
  }
}

export default pool;

