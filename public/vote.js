const form = document.getElementById('poll-form');
const message = document.getElementById('message');
const submit = document.getElementById('submit');

async function refresh() {
  const res = await fetch('/api/vote', { cache: 'no-store' });
  if (!res.ok) throw new Error('Az eredmények nem érhetők el.');
  const data = await res.json();
  document.getElementById('total').textContent = String(data.total);
  for (const choice of ['A','B','C']) {
    const value = data.counts[choice] || 0;
    const percent = data.total ? Math.round(value * 100 / data.total) : 0;
    document.getElementById('count-' + choice).textContent = `${value} szavazat (${percent}%)`;
    document.getElementById('bar-' + choice).style.width = `${percent}%`;
  }
  if (data.voted) {
    submit.disabled = true;
    message.textContent = 'Ebből a böngészőből már szavaztál.';
  }
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const choice = new FormData(form).get('choice');
  if (!choice) { message.textContent = 'Válassz egy lehetőséget!'; return; }
  submit.disabled = true;
  message.textContent = 'Szavazat mentése…';
  try {
    const res = await fetch('/api/vote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ choice })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Hiba történt.');
    message.textContent = 'Köszönjük! A szavazatodat eltároltuk.';
    await refresh();
  } catch (error) {
    message.textContent = error.message;
    if (!message.textContent.includes('már szavaztál')) submit.disabled = false;
  }
});
refresh().catch(error => message.textContent = error.message);
