/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import AgregarDispositivo from './pages/AgregarDispositivo.tsx';
import PanelGeneral from './pages/PanelGeneral.tsx';
import Configuracion from './pages/Configuracion.tsx';
import Dispositivo from './pages/Dispositivo.tsx';
import PrivateRoute from './components/PrivateRoute.tsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/agregardispositivo' element={
          <PrivateRoute>
            <AgregarDispositivo />
          </PrivateRoute>
        } />
        <Route path='/general' element={
          <PrivateRoute>
            <PanelGeneral />
          </PrivateRoute>
        } />
        <Route path='/configuracion' element={
          <PrivateRoute>
            <Configuracion />
          </PrivateRoute>
        } />
        <Route path='/dispositivo' element={
          <PrivateRoute>
            <Dispositivo />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  </StrictMode>
)
