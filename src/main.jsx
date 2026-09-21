import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PESSOA } from './data/perfil';
import './estilos/portfolio.css';

// recado pra quem abrir o console
console.log(
  `%cOi, aqui é o Eduardo.%c\nSe você abriu o console, deve gostar de ver como as coisas funcionam por dentro. Eu também.\n\nGitHub: ${PESSOA.github}\nE-mail: ${PESSOA.email}`,
  'color:#e8a13a;font-size:13px;font-weight:600',
  'color:inherit;font-size:12px',
);

/* Liga as animacoes de entrada so quando o navegador tem o observador e a
   pessoa nao pediu menos movimento. Sem a classe "rv", tudo aparece parado. */
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('rv');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
