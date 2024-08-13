import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ProtectedRoute from './ProtectedRoute.jsx'
import TestTables from './TestTables.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes path="/" element={<App />}>
      <Route path="/" element={<App />} />
        <Route
          path="tablestest"
          element={
            <ProtectedRoute>
              <TestTables />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </StrictMode>,
)
