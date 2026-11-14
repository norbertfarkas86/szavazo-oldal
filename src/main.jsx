import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Program from './pages/Program.jsx';
import Dinner from './pages/Dinner.jsx';
import Tickets from './pages/Tickets.jsx';
import Goals from './pages/Goals.jsx';
import './styles/global.css';
function Pages(){const loc=useLocation();React.useEffect(()=>{const titles={'/':'Főoldal','/program.html':'Az est programja','/vacsora.html':'Gálavacsora','/jegyek.html':'Regisztrációs jegyek','/celjaink.html':'Közös céljaink'};document.title=`${titles[loc.pathname]||'Szülői Bál'} – Szülői Bál 2027`;window.scrollTo(0,0)},[loc.pathname]);return <Routes><Route path="/" element={<Home/>}/><Route path="/program.html" element={<Program/>}/><Route path="/vacsora.html" element={<Dinner/>}/><Route path="/jegyek.html" element={<Tickets/>}/><Route path="/celjaink.html" element={<Goals/>}/><Route path="/szavazas.html" element={<Navigate to="/celjaink.html" replace/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><Pages/></BrowserRouter></React.StrictMode>);
