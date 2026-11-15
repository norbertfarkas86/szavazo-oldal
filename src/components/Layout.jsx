import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { EVENT, navigation } from '../data/site.js';

export function Flourish({ heart = false, className = '' }) {
  return <div className={`flourish ${className}`} aria-hidden="true">
    <span></span><i className={heart ? 'flourish-heart' : 'flourish-diamond'}>{heart ? '♡' : ''}</i><span></span>
  </div>;
}

function LeafBranch({ className }) {
  return <svg className={className} viewBox="0 0 210 205" aria-hidden="true">
    <path d="M7 197 C43 164 76 140 101 104 C127 70 156 43 202 12" fill="none" stroke="#a47b42" strokeWidth="1.4"/>
    <g fill="#829278" stroke="#667765" strokeWidth="1">
      <path d="M28 177 C8 165 5 143 15 126 C38 132 51 147 42 166 Z"/>
      <path d="M49 159 C46 138 60 116 80 109 C88 132 78 152 56 163 Z"/>
      <path d="M76 129 C56 116 53 95 63 77 C85 82 98 101 91 119 Z"/>
      <path d="M100 106 C96 84 111 63 132 57 C138 81 126 99 106 110 Z"/>
      <path d="M129 75 C112 62 113 44 124 27 C145 33 155 49 145 64 Z"/>
      <path d="M158 49 C156 31 169 17 191 13 C193 31 182 45 163 53 Z"/>
    </g>
    <g fill="none" stroke="#d8c599" strokeWidth=".8" opacity=".85">
      <path d="M17 130 L40 167 M30 154 L16 151 M28 150 L29 139 M78 112 L55 160 M68 134 L59 128 M67 135 L78 130 M65 80 L88 119 M78 102 L67 101 M78 102 L80 90 M129 60 L105 107 M118 84 L110 78 M118 84 L129 79 M126 30 L142 65 M135 49 L127 47 M189 16 L161 51 M177 32 L171 25 M177 32 L185 31"/>
    </g>
  </svg>;
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
