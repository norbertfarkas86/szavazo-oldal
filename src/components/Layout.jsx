import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { EVENT, navigation } from '../data/site.js';

export function Flourish({ heart = false, className = '' }) {
  return <div className={`flourish ${className}`} aria-hidden="true">
    <span></span><i className={heart ? 'flourish-heart' : 'flourish-diamond'}>{heart ? '♡' : ''}</i><span></span>
  </div>;
}

function LeafBranch({ className }) {
  return <img className={className} src="/assets/level-disz.webp" alt="" aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link to="/" className="brand" aria-label="Szülői Bál 2027 – főoldal" onClick={() => setOpen(false)}>
      <img src="/assets/logo.png" alt="" className="brand-logo" />
      <span><strong>Szülői Bál</strong><small>2027 · SZEGED</small></span>
    </Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
      {open ? 'Bezárás' : 'Menü'} <span aria-hidden="true">{open ? '×' : '☰'}</span>
    </button>
    <nav id="site-nav" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Fő navigáció">
      <NavLink to="/" end onClick={() => setOpen(false)}>Főoldal</NavLink>
      {navigation.map(item => <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)}>{item.short}</NavLink>)}
    </nav>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <Flourish heart />
    <p className="footer-motto">Közösen <b>◆</b> gyermekeinkért <b>◆</b> együtt</p>
    <p>{EVENT.title} {EVENT.year}</p>
  </footer>;
}

export function SiteLayout({ children }) {
  const { pathname } = useLocation();
  return <div className="site-wrap">
    <a href="#tartalom" className="skip-link">Ugrás a tartalomra</a>
    <div className={`page-frame ${pathname === '/vacsora.html' ? 'page-frame--dinner' : ''}`}>
      <LeafBranch className="corner-leaves corner-leaves--top" />
      <LeafBranch className="corner-leaves corner-leaves--bottom" />
      {pathname === '/vacsora.html' && <div className="dinner-art" aria-hidden="true" />}
      <Header />
      <main id="tartalom">{children}</main>
      <Footer />
    </div>
  </div>;
}

export function PageHeading({ eyebrow = 'Szülői Bál 2027', title, script, intro }) {
  return <header className="page-heading">
    <p className="eyebrow">{eyebrow}</p>
    <Flourish />
    <h1>{title}</h1>
    {script && <p className="heading-script">{script}</p>}
    {intro && <p className="page-intro">{intro}</p>}
  </header>;
}

export function PageEndLink({ to, children }) {
  return <div className="page-end-link"><Link className="text-link" to={to}>{children} <span aria-hidden="true">→</span></Link></div>;
}
