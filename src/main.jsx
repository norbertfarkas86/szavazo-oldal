import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/Layout.jsx';
import { Home, Program, Dinner, Tickets, Goals, VotePage, NotFound } from './pages/Pages.jsx';
import './styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return <BrowserRouter>
    <ScrollToTop />
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program.html" element={<Program />} />
        <Route path="/vacsora.html" element={<Dinner />} />
        <Route path="/jegyek.html" element={<Tickets />} />
        <Route path="/celjaink.html" element={<Goals />} />
        <Route path="/szavazas" element={<VotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  </BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
