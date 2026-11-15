import React from 'react';

export function NavIcon({ type }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return <svg viewBox="0 0 64 64" aria-hidden="true" {...common}>
    {type === 'program' && <><rect x="11" y="15" width="42" height="37" rx="4"/><path d="M20 10v10M44 10v10M11 26h42M20 33h4m7 0h4m7 0h4m-26 8h4m7 0h4m7 0h4"/></>}
    {type === 'dinner' && <><path d="M10 44h44M14 40c1-12 8-19 18-19s17 7 18 19H14ZM28 18a4 4 0 1 1 8 0M9 48h46M25 26c-4 2-6 5-7 9"/></>}
    {type === 'tickets' && <><path d="M12 23l35-10 4 12a5 5 0 0 0 3 10l3 9-35 10-3-9a5 5 0 0 0-3-10l-4-12Z"/><path d="M24 20l8 28M27 30l1 3m2 5 1 3"/><circle cx="40" cy="33" r="5"/></>}
    {type === 'goals' && <><path d="M32 33c-5-4-10-8-10-13a6 6 0 0 1 10-4 6 6 0 0 1 10 4c0 5-5 9-10 13Z"/><path d="M28 50h-6L12 39V28c0-4 5-4 6 0l1 7 7 5M36 50h6l10-11V28c0-4-5-4-6 0l-1 7-7 5"/></>}
  </svg>;
}
