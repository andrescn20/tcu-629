/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import AgregarDispositivo from './pages/AgregarDispositivo.tsx';
import PanelGeneral from './pages/PanelGeneral.tsx';
import Configuracion from './pages/Configuracion.tsx';
import Dispositivo from './pages/Dispositivo.tsx';
import PrivateRoute from './components/PrivateRoute.tsx'
import Unauthorized from './pages/Unauthorized.tsx'
import UsersConfig from './pages/UsersConfig.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import ResetPassword from './pages/ResetPassword.tsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={
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
          <PrivateRoute requiredRole='Admin'>
            <Configuracion />
          </PrivateRoute>
        } />
        <Route path='/dispositivo' element={
          <PrivateRoute>
            <Dispositivo />
          </PrivateRoute>
        } />
        <Route path='/usersconfig' element={
          <PrivateRoute requiredRole='Admin'>
            <UsersConfig />
          </PrivateRoute>
        } />
        <Route path='/unauthorized' element={
          <PrivateRoute>
            <Unauthorized />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  </StrictMode>
)
