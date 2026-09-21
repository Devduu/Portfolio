import { useEffect, useRef } from 'react';
import Cruzes from './Cruzes';
import { BAYER8, PX, lerCor, linhasDaGrade, ruido1 } from '../../lib/dither';

/* Faixa em dither entre as secoes: mais densa na coluna do conteudo,
   some pras bordas da tela. */

const LINHAS = 12;          // 24px de altura
const FORCA = 0.12;         // cor de cada pixel aceso
const PICO = 0.62;          // no meio fica perto do xadrez, sem virar faixa cheia
const DURACAO = 900;
const FRENTE = 0.22;        // largura da borda da entrada, em fracao da faixa

let contador = 0;

export default function Separador() {
  const caixa = useRef(null);
  const tela = useRef(null);

  useEffect(() => {
    const el = caixa.current;
    const cv = tela.current;
    const ctx = cv.getContext('2d');
    // desenha uma casa por pixel num canvas pequeno e amplia sem suavizar
    const fonte = document.createElement('canvas');
    const fctx = fonte.getContext('2d');
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    const semente = (contador += 1) * 7.3;
    let cols = 0;
    let largura = -1;
    let dens = new Float32Array(0);
    let lim = new Float32Array(0);
    let img = null;
    let cor = lerCor('--text');
    let progresso = reduz.matches ? 1 : 0;
    let raf = 0;

    const calcular = () => {
      largura = el.clientWidth;
      cols = Math.ceil(largura / PX);
      // aba escondida ou painel fechado: sem largura nao da pra montar a imagem
      if (cols < 1) { img = null; return; }
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      fonte.width = cols;
      fonte.height = LINHAS;
      cv.width = Math.round(cols * PX * dpr);
      cv.height = Math.round(LINHAS * PX * dpr);
      cv.style.width = `${cols * PX}px`;
      cv.style.height = `${LINHAS * PX}px`;
      img = fctx.createImageData(cols, LINHAS);
      dens = new Float32Array(cols * LINHAS);
      lim = new Float32Array(cols * LINHAS);

      const xs = linhasDaGrade();
      const esq = xs.length ? xs[0] : 0;
      const dir = xs.length ? xs[xs.length - 1] : largura;
      const margem = Math.max(esq, largura - dir, 1);

      for (let i = 0; i < cols; i += 1) {
        const x = (i + 0.5) * PX;
        // cheia no conteudo, some pra fora
        const fora = Math.min(1, Math.max(esq - x, x - dir, 0) / margem);
        let h = 1 - 0.88 * fora * fora * (3 - 2 * fora);
        // mais pontos perto das colunas do fundo
        if (xs.length) {
          const perto = Math.min(...xs.map((l) => Math.abs(l - x)));
          h *= 1 + 0.38 * Math.exp(-((perto / 22) ** 2));
        }
        h *= 0.78 + 0.44 * ruido1(x / 90 + semente);
        for (let j = 0; j < LINHAS; j += 1) {
          const k = j * cols + i;
          const v = 1 - Math.abs((j + 0.5) / LINHAS - 0.5) * 2;
          dens[k] = Math.min(0.9, PICO * v * h);
          lim[k] = (BAYER8[(j & 7) * 8 + (i & 7)] + 0.5) / 64;
        }
      }
    };

    const desenhar = () => {
      if (!img) return;
      const d = img.data;
      const alfa = Math.round(FORCA * 255);
      const [r, g, b] = cor;
      for (let i = 0; i < cols; i += 1) {
        let f = 1;
        if (progresso < 1) f = Math.min(1, Math.max(0, (progresso * (1 + FRENTE) - i / cols) / FRENTE));
        for (let j = 0; j < LINHAS; j += 1) {
          const k = j * cols + i;
          const o = k * 4;
          if (dens[k] * f > lim[k]) {
            d[o] = r;
            d[o + 1] = g;
            d[o + 2] = b;
            d[o + 3] = alfa;
          } else {
            d[o + 3] = 0;
          }
        }
      }
      fctx.putImageData(img, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(fonte, 0, 0, cv.width, cv.height);
    };

    const entrar = () => {
      if (progresso >= 1) return;
      const inicio = performance.now();
      const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / DURACAO);
        progresso = 1 - (1 - t) ** 2;
        desenhar();
        if (t < 1) raf = requestAnimationFrame(passo);
      };
      raf = requestAnimationFrame(passo);
    };

    const olho = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      olho.disconnect();
      entrar();
    }, { rootMargin: '0px 0px -8% 0px' });

    const medida = new ResizeObserver(() => {
      if (el.clientWidth === largura) return;
      calcular();
      desenhar();
    });

    const aoTema = () => {
      cor = lerCor('--text');
      desenhar();
    };

    calcular();
    desenhar();
    medida.observe(el);
    if (progresso < 1) olho.observe(el);
    window.addEventListener('temachange', aoTema);

    return () => {
      cancelAnimationFrame(raf);
      olho.disconnect();
      medida.disconnect();
      window.removeEventListener('temachange', aoTema);
    };
  }, []);

  return (
    <div className="sep" ref={caixa} aria-hidden="true">
      <div className="sep__p"><canvas ref={tela} /></div>
      <Cruzes />
    </div>
  );
}
