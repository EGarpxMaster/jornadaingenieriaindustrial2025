import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Importa HashRouter
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter> {/* Envuelve App con HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>,
)