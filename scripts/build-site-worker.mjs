import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};
const files = {};

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) await collect(absolute);
    else {
      const name = '/' + path.relative(output, absolute).split(path.sep).join('/');
      files[name] = { type: types[path.extname(absolute)] || 'application/octet-stream', body: (await readFile(absolute)).toString('base64') };
    }
  }
}

await collect(output);
const api = (await readFile('functions/api/vote.js', 'utf8')).replaceAll('export async function ', 'async function ');
const worker = `${api}
const staticFiles = ${JSON.stringify(files)};
function staticResponse(request) {
  const pathname = new URL(request.url).pathname;
  const key = staticFiles[pathname] ? pathname : (pathname.startsWith('/assets/') ? null : '/index.html');
  if (!key) return new Response('Not found', { status: 404 });
  const file = staticFiles[key];
  const bytes = Uint8Array.from(atob(file.body), char => char.charCodeAt(0));
  return new Response(request.method === 'HEAD' ? null : bytes, {
    headers: { 'Content-Type': file.type, 'Cache-Control': key === '/index.html' ? 'no-cache' : 'public, max-age=3600' },
  });
}
export default {
  async fetch(request, env) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/api/vote') {
      if (request.method === 'GET') return onRequestGet({ request, env });
      if (request.method === 'POST') return onRequestPost({ request, env });
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, POST' } });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    return staticResponse(request);
  }
};`;
await mkdir(path.join(output, 'server'), { recursive: true });
await writeFile(path.join(output, 'server', 'index.js'), worker);
console.log(`Worker elkészült: ${Object.keys(files).length} statikus fájl.`);
