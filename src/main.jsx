/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Auth0Provider, withAuthenticationRequired } from '@auth0/auth0-react';
import Login from './pages/Login.jsx'
import './index.css'
import TestTables from './TestTables.jsx'
import Profile from './pages/Profile.jsx'
import Home from './pages/Home.jsx'
import AgregarDispositivo from './pages/AgregarDispositivo.tsx';
import PanelGeneral from './pages/PanelGeneral.tsx';
import Configuracion from './pages/Configuracion.tsx';
import Dispositivo from './pages/Dispositivo.tsx';

const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
        <Auth0ProviderWithRedirectCallback
          domain={import.meta.env.auth0_domain}
          clientId={import.meta.env.auth0_client_id}
          authorizationParams={{
            redirect_uri: `${window.location.origin}/home`,
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/home" element={<ProtectedRoute component={Home} />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path='/agregardispositivo' element={<AgregarDispositivo />} />
            <Route path='/general' element={<PanelGeneral />} />
            <Route path='/ayuda' element={<Configuracion />} />
            <Route path='/dispositivo' element={<Dispositivo />} />
            <Route
              path="tablestest"
              element={
                <ProtectedRoute component={TestTables} />
              }
            />
          </Routes>
        </Auth0ProviderWithRedirectCallback>
      </Router>
  </StrictMode>
)
