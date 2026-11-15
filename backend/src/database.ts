import 'dotenv/config'

import { Pool } from 'pg'

const databaseUrl = process.env.DATABASE_URL?.trim()

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required.')
}

export const pool = new Pool({
  connectionString: databaseUrl,
})

export async function initializeDatabase(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS messages (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS messages_conversation_created_at_idx
      ON messages (conversation_id, created_at, id);

    CREATE TABLE IF NOT EXISTS portfolio_entries (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      content TEXT NOT NULL CHECK (char_length(content) <= 2000),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS member_portfolio_entries (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      member_id TEXT NOT NULL CHECK (member_id IN ('member-1', 'member-2', 'member-3')),
      title TEXT NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
      details TEXT NOT NULL CHECK (char_length(details) BETWEEN 1 AND 2000),
      certificate_image TEXT CHECK (
        certificate_image IS NULL OR
        (char_length(certificate_image) <= 300 AND certificate_image LIKE '/images/certificates/%')
      ),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS member_portfolio_entries_member_created_idx
      ON member_portfolio_entries (member_id, created_at, id);
  `)
}