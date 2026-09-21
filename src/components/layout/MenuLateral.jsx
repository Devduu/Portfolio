import { useEffect, useRef } from 'react';
import { SECOES_NAV, numeroDaSecao } from '../../data/perfil';

/* Menu lateral, so a partir de 1360px. Fechado, o nome vai a 0fr no grid
   (largura zero de verdade) pra faixa de captura continuar estreita, e o
   progresso vai direto no estilo, sem estado, pra rolagem nao redesenhar. */
export default function MenuLateral({ ativa }) {
  const tracos = useRef({});

  useEffect(() => {
    const secao = document.getElementById(ativa);
    const traco = tracos.current[ativa];
    if (!secao || !traco) return undefined;

    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = secao.getBoundingClientRect();
      const andado = window.innerHeight / 2 - r.top;
      const p = r.height ? Math.min(Math.max(andado / r.height, 0), 1) : 0;
      traco.style.transform = `scaleX(${p})`;
    };
    const aoRolar = () => { if (!raf) raf = requestAnimationFrame(medir); };

    medir();
    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
      traco.style.transform = 'scaleX(0)';
    };
  }, [ativa]);

  return (
    <nav className="lat" aria-label="Seções da página">
      <ul className="lat__l">
        {SECOES_NAV.map((s, i) => {
          const on = ativa === s.id;
          return (
            <li key={s.id} className={on ? 'lat__i lat__i--on' : 'lat__i'} style={{ '--i': i }}>
              <a href={`#${s.id}`} aria-current={on ? 'true' : undefined}>
                <span className="lat__n">{numeroDaSecao(s.id)}</span>
                <span className="lat__r">{s.rotulo}</span>
                <span className="lat__f">
                  <i ref={(el) => { tracos.current[s.id] = el; }} />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
