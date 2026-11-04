import React from 'react';
import ReactDOM from 'react-dom/client';
import StudioApp from './StudioApp';
import '../src/styles/index.css';

ReactDOM.createRoot(document.getElementById('studio-root')!).render(
  <React.StrictMode>
    <StudioApp />
  </React.StrictMode>
);
