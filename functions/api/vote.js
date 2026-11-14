const allowed = new Set(['A', 'B', 'C', 'D']);
const cookieName = 'poll_voter';
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

function getCookie(request) {
  const cookies = request.headers.get('Cookie') || '';
  const found = cookies.split(';').map(v => v.trim()).find(v => v.startsWith(cookieName + '='));
  return found ? found.slice(cookieName.length + 1) : null;
}
function json(data, status = 200, extra = {}) {
  return Response.json(data, { status, headers: { ...headers, ...extra } });
}

export async function onRequestGet({ env, request }) {
  try {
    const { results } = await env.DB.prepare('SELECT choice, COUNT(*) AS count FROM votes GROUP BY choice').all();
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    for (const row of results) counts[row.choice] = Number(row.count);
    let voted = false;
    const token = getCookie(request);
    if (token && /^[0-9a-f-]{36}$/i.test(token)) {
      const existing = await env.DB.prepare('SELECT 1 FROM votes WHERE voter_token = ? LIMIT 1').bind(token).first();
      voted = !!existing;
    }
    return json({ counts, total: counts.A + counts.B + counts.C + counts.D, voted });
  } catch (error) {
    console.error(error);
    return json({ error: 'Nem sikerült lekérni az eredményeket.' }, 500);
  }
}

export async function onRequestPost({ env, request }) {
  try {
    const origin = request.headers.get('Origin');
    if (origin && origin !== new URL(request.url).origin) return json({ error: 'Érvénytelen eredet.' }, 403);
    if (!(request.headers.get('Content-Type') || '').toLowerCase().startsWith('application/json')) {
      return json({ error: 'JSON formátum szükséges.' }, 415);
    }
    const token = getCookie(request);
    if (token) return json({ error: 'Ebből a böngészőből már szavaztál.' }, 409);
    const raw = await request.text();
    if (raw.length > 1024) return json({ error: 'Túl nagy kérés.' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: 'Hibás JSON.' }, 400); }
    if (!allowed.has(body?.choice)) return json({ error: 'A, B, C vagy D választható.' }, 400);
    const newToken = crypto.randomUUID();
    await env.DB.prepare('INSERT INTO votes (choice, voter_token) VALUES (?, ?)').bind(body.choice, newToken).run();
    return json({ ok: true }, 201, {
      'Set-Cookie': `${cookieName}=${newToken}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`
    });
  } catch (error) {
    console.error(error);
    return json({ error: 'Nem sikerült menteni a szavazatot.' }, 500);
  }
}
