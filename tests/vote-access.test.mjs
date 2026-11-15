import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { onRequestGet, onRequestPost } from '../functions/api/vote.js';

const token = 'A'.repeat(43);
const tokenHash = createHash('sha256').update(token).digest('hex');
const url = 'https://szavazo.example/api/vote';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  sqlite.prepare('INSERT INTO votes (choice, voter_token) VALUES (?, ?)')
    .run('A', '11111111-1111-4111-8111-111111111111');
  const DB = { prepare(sql) {
    let args = [];
    return {
      bind(...values) { args = values; return this; },
      all() { return { results: sqlite.prepare(sql).all(...args) }; },
      first() { return sqlite.prepare(sql).get(...args) ?? null; },
      run() { return sqlite.prepare(sql).run(...args); },
    };
  } };
  return { sqlite, env: { DB, VOTE_ACCESS_HASH: tokenHash } };
}

function voteRequest({ access, choice = 'D', cookie } = {}) {
  const headers = { 'Content-Type': 'application/json', Origin: 'https://szavazo.example' };
  if (access) headers.Authorization = `Bearer ${access}`;
  if (cookie) headers.Cookie = cookie;
  return new Request(url, { method: 'POST', headers, body: JSON.stringify({ choice }) });
}

test('the vote API refuses requests without the QR access token', async () => {
  const { sqlite, env } = database();
  const read = await onRequestGet({ env, request: new Request(url) });
  assert.equal(read.status, 403);
  const post = await onRequestPost({ env, request: voteRequest() });
  assert.equal(post.status, 403);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM votes').get().n, 1);
});

test('a different token cannot access the poll', async () => {
  const { env } = database();
  const request = new Request(url, { headers: { Authorization: `Bearer ${'B'.repeat(43)}` } });
  const result = await onRequestGet({ env, request });
  assert.equal(result.status, 403);
});

test('the QR token keeps old votes and permits one new vote per browser', async () => {
  const { sqlite, env } = database();
  const read = await onRequestGet({ env, request: new Request(url, { headers: { Authorization: `Bearer ${token}` } }) });
  assert.equal(read.status, 200);
  assert.deepEqual((await read.json()).counts, { A: 1, B: 0, C: 0, D: 0 });
  const post = await onRequestPost({ env, request: voteRequest({ access: token }) });
  assert.equal(post.status, 201);
  const cookie = post.headers.get('Set-Cookie').split(';')[0];
  const repeat = await onRequestPost({ env, request: voteRequest({ access: token, cookie }) });
  assert.equal(repeat.status, 409);
  assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM votes').get().n, 2);
});
