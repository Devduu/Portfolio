import { useCallback, useEffect, useRef, useState } from 'react';

/* O tema mora no data-tema do <html>: o CSS inteiro troca so redefinindo
   as variaveis em html[data-tema="claro"]. */
export default function useTema() {
  const [claro, setClaro] = useState(false);
  const tempo = useRef(null);

  const alternar = useCallback(() => setClaro((v) => !v), []);

  useEffect(() => {
    const raiz = document.documentElement;

    // a classe "trocando" liga a transicao de cor so durante a troca
    raiz.classList.add('trocando');
    if (claro) raiz.setAttribute('data-tema', 'claro');
    else raiz.removeAttribute('data-tema');

    // o cursor le as cores do tema, entao precisa se redesenhar
    window.dispatchEvent(new Event('temachange'));

    clearTimeout(tempo.current);
    tempo.current = setTimeout(() => raiz.classList.remove('trocando'), 450);
    return () => clearTimeout(tempo.current);
  }, [claro]);

  return { claro, alternar };
}
