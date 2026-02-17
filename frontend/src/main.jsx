import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/*
PASSO 1: pegar a div #root do index.html
PASSO 2: renderizar o componente App dentro dela
*/
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
