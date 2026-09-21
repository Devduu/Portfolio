import { useEffect, useRef } from 'react';

/* Conta de 0 ate o valor quando aparece na tela. O numero certo ja esta
   no HTML, que e o que o leitor de tela le. */
export default function Contador({ valor, duracao = 1200 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('rv')) return undefined;

    let raf = 0;
    el.textContent = '0';
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const inicio = performance.now();
      const passo = (agora) => {
        const t = Math.min((agora - inicio) / duracao, 1);
        el.textContent = String(Math.round(valor * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    }, { threshold: 0.6 });
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = String(valor);
    };
  }, [valor, duracao]);

  return (
    <>
      <span className="sr">{valor}</span>
      <span ref={ref} aria-hidden="true">{valor}</span>
    </>
  );
}
