/* Cada casa da matriz de Bayer e um limiar: acende quando a densidade
   passa dele. Casas de 2px, igual ao pixel do cursor. */

export const PX = 2;

const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

// 8x8: a 4x4 repetida em quatro blocos, cada bloco com um deslocamento
export const BAYER8 = Array.from({ length: 64 }, (_, i) => {
  const x = i % 8;
  const y = i >> 3;
  return 4 * BAYER4[(y % 4) * 4 + (x % 4)] + [0, 2, 3, 1][(y >> 2) * 2 + (x >> 2)];
});

// cor de uma variavel do tema em [r, g, b]
let rascunho = null;
export function lerCor(nome, reserva = '#ffffff') {
  rascunho ??= document.createElement('canvas').getContext('2d');
  const valor = getComputedStyle(document.documentElement).getPropertyValue(nome).trim() || reserva;
  rascunho.fillStyle = reserva;
  rascunho.fillStyle = valor;
  const c = rascunho.fillStyle;
  if (c.startsWith('#')) return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  return c.match(/[\d.]+/g).slice(0, 3).map(Number);
}

// x das linhas verticais do fundo (as quatro colunas e a borda da direita)
export function linhasDaGrade() {
  const cols = document.querySelectorAll('.amb__c');
  const xs = [...cols].map((c) => c.getBoundingClientRect().left);
  if (cols.length) xs.push(cols[cols.length - 1].getBoundingClientRect().right - 1);
  return xs;
}

// ruido suave em uma dimensao, sempre igual para o mesmo x
export function ruido1(x) {
  const i = Math.floor(x);
  const f = x - i;
  const h = (n) => {
    const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const u = f * f * (3 - 2 * f);
  return h(i) * (1 - u) + h(i + 1) * u;
}
