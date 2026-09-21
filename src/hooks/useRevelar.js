import { useCallback, useRef } from 'react';

/* Um observador so pra pagina toda: o elemento se registra pela ref e
   ganha data-visto quando aparece. Sem a classe "rv" no <html>, nasce visivel. */
let observador = null;

function pegarObservador() {
  if (observador || typeof IntersectionObserver === 'undefined') return observador;
  observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.setAttribute('data-visto', '');
        observador.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );
  return observador;
}

export default function useRevelar() {
  const atual = useRef(null);

  return useCallback((el) => {
    const obs = pegarObservador();
    if (!obs) return;
    if (atual.current) obs.unobserve(atual.current);
    atual.current = el;
    if (el) obs.observe(el);
  }, []);
}
