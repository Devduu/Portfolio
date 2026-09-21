import { useEffect, useRef, useState } from 'react';

/* Anel de pixels que segue o mouse com atraso, mais um ponto fixo.
   No escuro o anel usa mix-blend-mode difference pra ter contraste em
   qualquer fundo; no claro isso nao serve e ele vira ambar solido. */

const S = 40;   // diametro do anel em repouso
const D = 10;   // diametro do ponto
const PX = 2;   // tamanho do pixel
const LERP = 0.21;
const RESP = 1;
const CONTORNO = 0.85;
const FOLGA = 1;
const HOVER_EXP = 0.50;
const HOVER_W = 0.14;
const VEL = 0.17;
const PASSO = 33;   // ms entre dois desenhos do anel: o giro e lento, 30fps basta

// os canvas precisam caber o anel ja expandido, senao ele corta no hover
const SC = Math.ceil(S * (1 + HOVER_EXP)) + 2;
const DC = D + 2 * FOLGA * PX + 2 * PX;

const ALVOS = 'a,button,input,textarea,select,[data-clic],[data-cursor]';

/* Distancia e angulo de cada pixel nunca mudam, entao ficam calculados
   aqui uma vez so. No quadro sobra soma e multiplicacao. */
const CELULAS = (() => {
  const c = SC / 2;
  const limite = (S / 2 - PX) * (1 + HOVER_EXP) * 1.06;  // anel no maximo que ele chega
  const px = [], py = [], pr = [], s3 = [], c3 = [], s4 = [], c4 = [];
  for (let y = 0; y < SC; y += PX) {
    for (let x = 0; x < SC; x += PX) {
      const dx = x + PX / 2 - c;
      const dy = y + PX / 2 - c;
      const r = Math.hypot(dx, dy);
      if (r > limite) continue;                          // canto do canvas: nunca acende
      const ang = Math.atan2(dy, dx);
      px.push(x); py.push(y); pr.push(r);
      s3.push(Math.sin(3 * ang)); c3.push(Math.cos(3 * ang));
      s4.push(Math.sin(4 * ang)); c4.push(Math.cos(4 * ang));
    }
  }
  return {
    n: px.length,
    x: Uint8Array.from(px), y: Uint8Array.from(py), r: Float32Array.from(pr),
    s3: Float32Array.from(s3), c3: Float32Array.from(c3),
    s4: Float32Array.from(s4), c4: Float32Array.from(c4),
  };
})();

function daPaleta() {
  const cs = getComputedStyle(document.documentElement);
  const v = (nome, padrao) => (cs.getPropertyValue(nome) || '').trim() || padrao;
  return {
    miolo: v('--cur', '#F0ECE8'),
    borda: v('--cur-borda', '#05060A'),
    anel: v('--cur-anel', '#F0ECE8'),
    blend: v('--cur-blend', 'difference'),
    solidez: parseFloat(v('--cur-solidez', '.38')) || 0.38,
  };
}

export default function Cursor() {
  const anelRef = useRef(null);
  const pontoRef = useRef(null);
  const [ativo, setAtivo] = useState(false);

  // so entra em desktop com ponteiro fino, e respeita quem pediu menos movimento
  useEffect(() => {
    const ponteiro = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    const avalia = () => setAtivo(ponteiro.matches && !reduz.matches);
    avalia();
    ponteiro.addEventListener('change', avalia);
    reduz.addEventListener('change', avalia);
    return () => {
      ponteiro.removeEventListener('change', avalia);
      reduz.removeEventListener('change', avalia);
    };
  }, []);

  useEffect(() => {
    if (!ativo) return;
    const anel = anelRef.current;
    const ponto = pontoRef.current;
    if (!anel || !ponto) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ca = anel.getContext('2d');
    const cp = ponto.getContext('2d');
    anel.width = SC * dpr; anel.height = SC * dpr; ca.setTransform(dpr, 0, 0, dpr, 0, 0);
    ponto.width = DC * dpr; ponto.height = DC * dpr; cp.setTransform(dpr, 0, 0, dpr, 0, 0);

    let p = daPaleta();

    // disco feito de quadradinhos, com 1px de folga entre eles
    const disco = (g, tamanho, raio) => {
      const c = tamanho / 2;
      for (let y = 0; y < tamanho; y += PX) {
        for (let x = 0; x < tamanho; x += PX) {
          const dx = x + PX / 2 - c;
          const dy = y + PX / 2 - c;
          if (Math.hypot(dx, dy) / raio > 1) continue;
          g.fillRect(x, y, PX - 1, PX - 1);
        }
      }
    };

    // o ponto e fixo: so redesenha quando o tema muda
    const R = (D * 0.70) / 2;
    const pintaPonto = () => {
      p = daPaleta();
      anel.style.mixBlendMode = p.blend;
      cp.clearRect(0, 0, DC, DC);
      cp.fillStyle = p.borda; cp.globalAlpha = CONTORNO; disco(cp, DC, R + FOLGA * PX);
      cp.fillStyle = p.miolo; cp.globalAlpha = 1; disco(cp, DC, R);
    };
    pintaPonto();
    window.addEventListener('temachange', pintaPonto);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let x = mx, y = my, hover = 0, alvoHover = 0, raf = 0, ultimo = 0;
    let ax = NaN, ay = NaN, bx = NaN, by = NaN;   // ultima posicao escrita em cada canvas

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      const el = document.elementFromPoint(mx, my);
      alvoHover = el && el.closest(ALVOS) ? 1 : 0;
    };
    window.addEventListener('mousemove', move, { passive: true });

    const desenharAnel = (t) => {
      const rMax = (S / 2 - PX) * (1 + hover * HOVER_EXP);
      const esp = 0.17 + hover * HOVER_W;
      const solidez = Math.min(0.93, p.solidez + hover * 0.30);
      const dura = 1 - solidez;
      // os quatro unicos senos do quadro: dentro do laco viram soma de angulos
      const s22 = Math.sin(2.2 * t), c22 = Math.cos(2.2 * t);
      const s14 = Math.sin(1.4 * t);
      const s31 = Math.sin(3.1 * t), c31 = Math.cos(3.1 * t);
      const base = 0.78 + RESP * 0.05 * s14;

      ca.clearRect(0, 0, SC, SC);
      ca.fillStyle = p.anel;
      const { n, x: cx, y: cy, r: cr, s3, c3, s4, c4 } = CELULAS;
      for (let i = 0; i < n; i += 1) {
        const d = cr[i] / rMax;
        if (d > 1.06) continue;
        const alvo = base + RESP * 0.09 * (s3[i] * c22 - c3[i] * s22);
        let a = 1 - Math.abs(d - alvo) / esp;
        if (a <= 0) continue;
        a *= solidez + dura * (0.5 + 0.5 * (s31 * c4[i] - c31 * s4[i]));
        ca.globalAlpha = a < 1 ? a : 1;
        ca.fillRect(cx[i], cy[i], PX - 1, PX - 1);
      }
      ca.globalAlpha = 1;
    };

    const frame = (agora) => {
      raf = requestAnimationFrame(frame);
      x += (mx - x) * LERP;
      y += (my - y) * LERP;
      hover += (alvoHover - hover) * VEL;

      // escrever transform sempre custa um recalculo de estilo por quadro,
      // mesmo com o mouse parado. So escreve quando andou de verdade.
      const nx = Math.round((x - SC / 2) * 2) / 2;
      const ny = Math.round((y - SC / 2) * 2) / 2;
      if (nx !== ax || ny !== ay) {
        anel.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
        ax = nx; ay = ny;
      }
      const px2 = mx - DC / 2, py2 = my - DC / 2;
      if (px2 !== bx || py2 !== by) {
        ponto.style.transform = `translate3d(${px2}px, ${py2}px, 0)`;
        bx = px2; by = py2;
      }

      if (agora - ultimo < PASSO) return;
      ultimo = agora;
      desenharAnel(agora / 1000);
    };
    raf = requestAnimationFrame(frame);

    document.documentElement.classList.add('cur-on');
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('temachange', pintaPonto);
      document.documentElement.classList.remove('cur-on');
    };
  }, [ativo]);

  if (!ativo) return null;

  const base = {
    position: 'fixed', top: 0, left: 0, pointerEvents: 'none',
    zIndex: 999999, willChange: 'transform',
  };

  return (
    <>
      <canvas ref={anelRef} aria-hidden="true" style={{ ...base, width: SC, height: SC }} />
      <canvas ref={pontoRef} aria-hidden="true" style={{ ...base, width: DC, height: DC }} />
    </>
  );
}
