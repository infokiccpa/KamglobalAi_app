import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Pages are pre-rendered at build time (scripts/prerender.mjs); hydrate them so content stays visible while JS loads.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app, {
    onRecoverableError: (error) => {
      if (import.meta.env.DEV) console.warn('Hydration fallback:', error);
    },
  });
} else {
  ReactDOM.createRoot(container).render(app);
}
