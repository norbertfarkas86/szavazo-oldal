import React, { useEffect, useState } from 'react';
import { goals } from '../data/site.js';

async function requestResults(accessToken) {
  const response = await fetch('/api/vote', {
    cache: 'no-store', credentials: 'same-origin', headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('A szavazás jelenleg nem érhető el.');
  return response.json();
}

export function Voting({ accessToken }) {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    requestResults(accessToken).then(data => { if (active) { setResult(data); if (data.voted) setMessage('Ebből a böngészőből már érkezett szavazat.'); } })
      .catch(err => { if (active) { setError(true); setMessage(err.message); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [accessToken]);

  async function submit(event) {
    event.preventDefault();
    if (!selected || !result || result.voted || sending) return;
    setSending(true);
    setError(false);
    setMessage('Szavazat mentése…');
    try {
      const response = await fetch('/api/vote', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ choice: selected }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Nem sikerült menteni a szavazatot.');
      setMessage('Köszönjük, szavazatát rögzítettük!');
      setResult(await requestResults(accessToken));
    } catch (err) {
      setError(true);
      setMessage(err.message || 'Nem sikerült menteni a szavazatot.');
      try { setResult(await requestResults(accessToken)); } catch { /* Az előző állapot megmarad. */ }
    } finally { setSending(false); }
  }

  if (loading) return <section className="vote-section"><p role="status">Szavazás betöltése…</p></section>;
  if (!result) return <section className="vote-section"><p role="alert">A szavazás nem érhető el. Kérjük, olvassa be az eseményen kihelyezett QR-kódot, és próbálja újra.</p></section>;

  return <section className="vote-section" aria-labelledby="vote-title">
    <h2 id="vote-title">Szavazzon Ön is!</h2>
    <p>Válassza ki, melyik célt támogatná elsőként.</p>
    <p className="vote-note">Böngészőnként egy szavazat adható le; ezt süti segítségével korlátozzuk.</p>
    <form onSubmit={submit}>
      <fieldset className="vote-options" disabled={loading || !result || result.voted || sending}>
        <legend className="sr-only">A támogatandó cél kiválasztása</legend>
        {goals.map((goal, index) => <label className={`vote-option ${selected === goal.id ? 'selected' : ''}`} key={goal.id}>
          <input type="radio" name="choice" value={goal.id} checked={selected === goal.id} onChange={() => setSelected(goal.id)} />
          <span>{index + 1}.</span><strong>{goal.short}</strong>
        </label>)}
      </fieldset>
      <button className="button button--wine" type="submit" disabled={loading || !result || !selected || result.voted || sending}>
        {sending ? 'Szavazat mentése…' : 'Szavazatom leadása'} <span aria-hidden="true">→</span>
      </button>
      <p className={`vote-message ${error ? 'is-error' : ''}`} role="status" aria-live="polite">{loading ? 'Szavazás betöltése…' : message}</p>
    </form>
    {result && <div className="vote-results">
      <h3>A szavazás állása</h3>
      <p>Összes leadott szavazat: <strong>{result.total}</strong></p>
      {goals.map((goal, index) => {
        const count = Number(result.counts?.[goal.id] || 0);
        const percent = result.total ? Math.round(count / result.total * 100) : 0;
        return <div className="result-row" key={goal.id}>
          <div><span>{index + 1}. {goal.short}</span><span>{count} ({percent}%)</span></div>
          <div className="result-track"><span style={{ width: `${percent}%` }} /></div>
        </div>;
      })}
    </div>}
  </section>;
}
