import { useEffect, useRef } from 'react';
import { BAYER8, PX, lerCor } from '../../lib/dither';

/* Monograma EDM com halo de pixels em volta. As tres letras sao um
   caminho so: o fill-rule evenodd abre o traco onde elas se cruzam,
   entao o D entra dentro do E sem truque de cor. */

const CAMINHO = 'M32.60 0L-2.20 0Q-3.60 0-3.60-1Q-3.60-2.10-1.60-2.40L0.40-2.70Q2.60-3 3.45-3.75Q4.30-4.50 4.70-6.60L18.30-65.40Q18.80-67.50 18.30-68.20Q17.80-68.90 15.80-69.30L13.80-69.70Q12.50-70 12.50-70.80Q12.50-72 14.30-72L47.70-72Q50.30-72 49.80-69.70L46.70-53.10Q46.40-51.40 45.10-51.40Q43.70-51.40 43.90-52.70L44.20-56.20Q44.70-61.30 43.35-64.20Q42-67.10 39.35-68.30Q36.70-69.50 33.20-69.50Q29.20-69.50 27.40-68.35Q25.60-67.20 24.90-64.30L19.40-40.20Q19.10-38.80 20.50-38.80L25.60-38.80Q30-38.80 32-43.50L34.20-48.50Q34.70-49.80 35.80-49.80Q36.40-49.80 36.75-49.35Q37.10-48.90 36.90-48.10L31.70-25.60Q31.20-23.90 30-23.90Q28.80-23.90 28.80-25.20L28.90-30.10Q29-33.60 28.05-34.70Q27.10-35.80 24.80-35.80L19.80-35.80Q18.30-35.80 18-34.40L12.20-9.30Q11.40-5.70 12.90-4.10Q14.40-2.50 19.30-2.50Q22.30-2.50 25.25-3.45Q28.20-4.40 30.85-7.10Q33.50-9.80 35.70-14.90L38.10-20.50Q38.60-21.80 39.70-21.80Q41.20-21.80 40.70-20.10L35.60-2.30Q35 0 32.60 0 M51.60 0L31.20 0Q29.80 0 29.80-1Q29.80-2.10 31.80-2.40L33.80-2.70Q36-3 36.85-3.75Q37.70-4.50 38.10-6.60L51.70-65.40Q52.20-67.50 51.70-68.20Q51.20-68.90 49.20-69.30L47.20-69.70Q45.90-70 45.90-70.80Q45.90-72 47.70-72L67.80-72Q76.40-72 81.45-65.65Q86.50-59.30 86.50-46.80Q86.50-37.60 83.60-29.15Q80.70-20.70 75.80-14.15Q70.90-7.60 64.65-3.80Q58.40 0 51.60 0M52.10-2.60Q57.80-2.60 62.80-6.80Q67.80-11 71.60-18.25Q75.40-25.50 77.55-34.60Q79.70-43.70 79.70-53.40Q79.70-61.40 76.40-65.40Q73.10-69.40 67.20-69.40Q59.70-69.40 58-62.10L46-9.90Q45.10-5.90 46.75-4.25Q48.40-2.60 52.10-2.60 M100.90-1Q100.40-1 100-1.30Q99.60-1.60 99.60-2.60L98.60-63.60Q98.60-64.30 98.15-64.30Q97.70-64.30 97.50-63.70L82.80-8.60Q82.10-5.80 82.75-4.35Q83.40-2.90 85.80-2.50L87-2.30Q88.20-2.20 88.20-1.20Q88.20 0 86.30 0L72.20 0Q70.70 0 70.70-1Q70.70-2.10 72.30-2.30L73.70-2.50Q76.40-2.90 77.70-4.35Q79-5.80 79.70-8.60L94.80-65.40Q95.30-67.50 94.80-68.20Q94.30-68.90 92.10-69.30L90.40-69.60Q88.80-69.90 88.80-70.90Q88.80-72 90.60-72L102.60-72Q105.50-72 105.50-69L106.10-19.30Q106.10-18.60 106.55-18.55Q107-18.50 107.30-19.10L131.50-69.50Q132.70-72 135.30-72L147.40-72Q148.60-72 148.60-71Q148.60-70 146.90-69.70L144.50-69.30Q142.30-68.90 141.50-68.20Q140.70-67.50 140.20-65.40L128.60-6.60Q128.20-4.50 128.65-3.80Q129.10-3.10 131.10-2.70L132.80-2.40Q133.80-2.30 134.10-1.95Q134.40-1.60 134.40-1.20Q134.40 0 132.60 0L114.80 0Q113.40 0 113.40-1Q113.40-2 115-2.30L117.40-2.70Q119.60-3.10 120.45-3.80Q121.30-4.50 121.70-6.60L133-63.30Q133.20-64 132.70-64.15Q132.20-64.30 131.90-63.70L102.70-2.60Q102.30-1.60 101.85-1.30Q101.40-1 100.90-1';
const CAIXA = '-3.60 -72.00 152.20 72.00';

const DENTRO = 0.53;       // onde o halo comeca, em fracao do lado
const FORA = 0.98;         // onde ele acaba
const PICO = 0.6;          // densidade no ponto mais cheio do halo
const ALFA = 0.34;         // o halo e enfeite, entao entra apagado
const RESPIRO = 3600;      // ida e volta do respiro, em ms
const TROCA = 130;         // de quanto em quanto tempo os pixels mudam
const ENTRADA = 1000;      // o halo abrindo no carregamento

export default function Marca() {
  const tela = useRef(null);

  useEffect(() => {
    const cv = tela.current;
    const ctx = cv.getContext('2d');
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cor = lerCor('--deco');
    let lado = 0;
    let cols = 0;
    let raf = 0;
    let ultimo = -1e9;
    let fase = 0;
    const nasceu = performance.now();

    const medir = () => {
      lado = cv.clientWidth;
      cols = Math.ceil(lado / PX);
      if (cols < 1) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      cv.width = Math.round(cols * PX * dpr);
      cv.height = Math.round(cols * PX * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const desenhar = (agora) => {
      if (!cols) return;
      const t = Math.min(1, (agora - nasceu) / ENTRADA);
      const abertura = DENTRO + (FORA - DENTRO) * (1 - (1 - t) ** 3);
      const respiro = reduz.matches ? 1 : 0.86 + 0.14 * Math.sin((agora / RESPIRO) * Math.PI * 2);
      const meio = cols / 2;
      ctx.clearRect(0, 0, cols * PX, cols * PX);
      ctx.fillStyle = `rgba(${cor[0]}, ${cor[1]}, ${cor[2]}, ${ALFA})`;
      for (let y = 0; y < cols; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const r = Math.hypot(x + 0.5 - meio, y + 0.5 - meio) / meio;
          if (r < DENTRO || r > abertura) continue;
          // sobe rapido junto do circulo e cai devagar pra fora
          const u = (r - DENTRO) / (abertura - DENTRO);
          const d = PICO * Math.min(1, u / 0.26) * (1 - u) ** 1.7 * respiro;
          const lim = (BAYER8[((y + fase) & 7) * 8 + ((x + fase * 3) & 7)] + 0.5) / 64;
          if (d > lim) ctx.fillRect(x * PX, y * PX, PX, PX);
        }
      }
    };

    const passo = (agora) => {
      raf = requestAnimationFrame(passo);
      if (agora - ultimo < TROCA) return;
      ultimo = agora;
      fase = (fase + 3) % 8;
      desenhar(agora);
    };

    const aoTema = () => { cor = lerCor('--deco'); desenhar(performance.now()); };
    const medida = new ResizeObserver(() => { if (medir()) desenhar(performance.now()); });

    // o cabecalho rola junto com a pagina: quando ele sai da tela o halo
    // para de desenhar e so volta quando a marca aparece de novo
    const olho = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting && !reduz.matches) raf = requestAnimationFrame(passo);
    });

    if (medir()) desenhar(performance.now());
    medida.observe(cv);
    olho.observe(cv);
    window.addEventListener('temachange', aoTema);

    return () => {
      cancelAnimationFrame(raf);
      medida.disconnect();
      olho.disconnect();
      window.removeEventListener('temachange', aoTema);
    };
  }, []);

  return (
    <span className="marca" aria-hidden="true">
      <canvas className="marca__halo" ref={tela} />
      <span className="marca__bola">
        <svg viewBox={CAIXA} focusable="false"><path fillRule="evenodd" d={CAMINHO} /></svg>
      </span>
    </span>
  );
}
