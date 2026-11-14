-- MEGLÉVŐ D1 adatbázis: a korábbi A/B/C szavazatok megőrzésével
-- Előtte készíts D1 biztonsági mentést!
-- Futtatás: npx wrangler d1 execute szavazas-db --remote --file=./migration-4-options.sql
-- Cloudflare D1 SQL importja a több utasítást egy tranzakcióban hajtja végre.
CREATE TABLE votes_migration_4 (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice TEXT NOT NULL CHECK (choice IN ('A','B','C','D')),
  voter_token TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
INSERT INTO votes_migration_4 (id, choice, voter_token, created_at)
SELECT id, choice, voter_token, created_at FROM votes;
DROP TABLE votes;
ALTER TABLE votes_migration_4 RENAME TO votes;
CREATE INDEX idx_votes_choice ON votes(choice);
