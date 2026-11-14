-- Friss telepítéshez. Meglévő votes tábla esetén a migration-4-options.sql fájlt használd!
CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice TEXT NOT NULL CHECK (choice IN ('A','B','C','D')),
  voter_token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_votes_choice ON votes(choice);
