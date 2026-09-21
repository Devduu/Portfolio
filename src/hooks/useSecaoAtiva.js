import { useEffect, useState } from 'react';

/* Qual secao esta no meio da tela, por uma faixa estreita no centro.
   Usado pelo menu do topo e pelo lateral. */
export default function useSecaoAtiva(ids) {
  const [ativa, setAtiva] = useState(ids[0] || '');

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => { if (e.isIntersecting) setAtiva(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);

  return ativa;
}
