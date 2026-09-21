import { useEffect, useRef } from 'react';
import { PX, lerCor, linhasDaGrade } from '../../lib/dither';

/* Duas luzes em dither na GPU, uma no topo e outra perto do contato.
   Sem placa de video ou com quadros lentos demais o canvas se desliga e
   o fundo volta a ser o de sempre. */

const ALFA = 0.12;                        // cor de cada pixel aceso
const TEXTURA = 0.8;                      // quanto o ruido quebra a luz em nuvens
const TOPO = { forca: 0.6, raio: 760 };
const BASE = { forca: 0.6, raio: 680 };
const GANHO_LINHA = 2.2;                  // as colunas acendem antes do fundo
const ENTRADA = 1600;
const TROCA = 380;                        // mesma duracao da troca de tema do CSS
const LENTO = 45;                         // ms por quadro a partir do qual a luz desliga

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';

const CABECA = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
`;

// 1a passada: uma casa por pixel. Guarda a cor da luz em rgb e a intensidade em a.
const CAMPO = `${CABECA}
uniform vec2 uCampo;
uniform float uCel, uTex, uT, uRola, uEntrada;
uniform vec4 uL1, uL2;
uniform vec3 uTinta1, uTinta2;

float hash(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float ruido(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
}
float luz(vec2 p,vec4 L){float f=clamp(1.-length(p-L.xy)/L.z,0.,1.);return L.w*f*f;}

void main(){
  vec2 cel=vec2(floor(gl_FragCoord.x),uCampo.y-1.-floor(gl_FragCoord.y));
  vec2 c=(cel+.5)*uCel;

  // nuvens lentas presas a pagina
  vec2 q=vec2(c.x,c.y+uRola)/170.;
  float n=ruido(q+vec2(uT*.05,-uT*.03))*.65+ruido(q*2.3-vec2(uT*.04,0.))*.35;
  float m=mix(1.,.2+1.4*n,uTex);

  // na entrada cada luz acende do centro pra fora
  float e1=clamp(uEntrada*1.7-length(c-uL1.xy)/uL1.z*.7,0.,1.);
  float e2=clamp(uEntrada*1.7-length(c-uL2.xy)/uL2.z*.7,0.,1.);
  float d1=luz(c,uL1)*m*e1;
  float d2=luz(c,uL2)*m*e2;
  float d=d1+d2;
  gl_FragColor=vec4((d1*uTinta1+d2*uTinta2)/max(d,1e-4),clamp(d,0.,1.));
}`;

// 2a passada: na resolucao da tela, aplica a matriz e desenha as colunas.
const TELA = `${CABECA}
uniform vec2 uTam, uCampo;
uniform sampler2D uLuz;
uniform float uEsc, uCel, uAlfa, uGanho;
uniform vec3 uFundo, uLinha;
uniform float uLinhas[5];

float bayer2(vec2 a){a=floor(a);return fract(a.x/2.+a.y*a.y*.75);}
float bayer4(vec2 a){return bayer2(.5*a)*.25+bayer2(a);}
float bayer8(vec2 a){return bayer4(.5*a)*.25+bayer2(a);}
// ordem de 8 niveis ao longo da coluna, pra ela acender em trechos
float ordem(float i){i=mod(i,8.);return(4.*mod(i,2.)+2.*mod(floor(i/2.),2.)+floor(i/4.)+.5)/8.;}

void main(){
  vec2 px=vec2(gl_FragCoord.x,uTam.y-gl_FragCoord.y);
  vec2 cel=floor(px/uEsc/uCel);
  vec4 l=texture2D(uLuz,vec2(cel.x+.5,uCampo.y-cel.y-.5)/uCampo);

  for(int i=0;i<5;i++){
    if(uLinhas[i]>=0.&&px.x>=uLinhas[i]&&px.x<uLinhas[i]+uEsc){
      float acesa=step(ordem(cel.y),l.a*uGanho);
      gl_FragColor=vec4(mix(uLinha,mix(uFundo,l.rgb,min(1.,uAlfa*2.6)),acesa),1.);
      return;
    }
  }
  gl_FragColor=vec4(l.rgb*uAlfa,uAlfa)*step(bayer8(cel)+.5/64.,l.a);
}`;

function programa(gl, frag) {
  const sombra = (tipo, fonte) => {
    const s = gl.createShader(tipo);
    gl.shaderSource(s, fonte);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const v = sombra(gl.VERTEX_SHADER, VERT);
  const f = sombra(gl.FRAGMENT_SHADER, frag);
  if (!v || !f) return null;
  const p = gl.createProgram();
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

// WebGL desenhado pela CPU (maquina virtual, placa bloqueada) deixa a pagina travando
function emSoftware(gl) {
  let nome = gl.getParameter(gl.RENDERER) || '';
  if (/^webkit webgl$/i.test(nome)) {
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    if (info) nome = gl.getParameter(info.UNMASKED_RENDERER_WEBGL) || nome;
  }
  return /swiftshader|llvmpipe|softpipe|software|basic render|offscreen/i.test(nome);
}

const misturar = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const unidade = (v) => v.map((x) => x / 255);

export default function Luz() {
  const ref = useRef(null);

  useEffect(() => {
    const tela = ref.current;
    const raiz = document.documentElement;
    const gl = tela.getContext('webgl', {
      alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false,
      powerPreference: 'low-power', failIfMajorPerformanceCaveat: true,
    });
    const usavel = gl && !emSoftware(gl);
    const campo = usavel && programa(gl, CAMPO);
    const final = usavel && programa(gl, TELA);
    if (!campo || !final) {
      tela.hidden = true;
      return undefined;
    }

    // um triangulo que cobre a tela, usado pelas duas passadas
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const vertices = new Map([campo, final].map((p) => [p, gl.getAttribLocation(p, 'a')]));
    const usar = (p) => {
      gl.useProgram(p);
      gl.enableVertexAttribArray(vertices.get(p));
      gl.vertexAttribPointer(vertices.get(p), 2, gl.FLOAT, false, 0, 0);
    };
    const locais = (p, nomes) => Object.fromEntries(nomes.map((n) => [n, gl.getUniformLocation(p, n)]));
    const uc = locais(campo, ['uCampo', 'uCel', 'uTex', 'uT', 'uRola', 'uEntrada', 'uL1', 'uL2', 'uTinta1', 'uTinta2']);
    const uf = locais(final, ['uTam', 'uCampo', 'uLuz', 'uEsc', 'uCel', 'uAlfa', 'uGanho', 'uFundo', 'uLinha', 'uLinhas']);

    // textura com uma casa por texel, preenchida na 1a passada
    const textura = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textura);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const quadroBuf = gl.createFramebuffer();

    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cw = 0;
    let ch = 0;
    let larg = 0;
    let alt = 0;
    let esc = 1;
    let docAlt = 0;
    let linhas = [-1, -1, -1, -1, -1];
    const inicio = performance.now();
    let ultimo = 0;
    let rolaAntes = -1;
    let sujo = true;
    let morto = false;
    let anterior = 0;
    let desenhou = false;
    let media = 0;
    let amostras = 0;
    let raf = 0;
    let espera = 0;

    // cores do tema; na troca elas passam de uma pra outra junto com o CSS
    const lerTema = () => {
      const ganho = parseFloat(getComputedStyle(raiz).getPropertyValue('--luz-ganho')) || 1;
      return {
        t1: lerCor('--luz-1', '#f0ece8'),
        t2: lerCor('--luz-2', '#e8a13a'),
        fundo: lerCor('--bg', '#08090a'),
        linha: lerCor('--line-soft', '#131417'),
        alfa: [ALFA * ganho],
      };
    };
    let cores = lerTema();
    let de = cores;
    let para = cores;
    let troca = -1e9;

    const medir = () => {
      const r = tela.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      larg = r.width;
      alt = r.height;
      tela.width = Math.round(larg * dpr);
      tela.height = Math.round(alt * dpr);
      esc = tela.width / larg;
      docAlt = raiz.scrollHeight;
      const xs = linhasDaGrade();
      linhas = [0, 1, 2, 3, 4].map((i) => (xs[i] === undefined ? -1 : Math.round(xs[i] * esc)));

      const w = Math.ceil(larg / PX);
      const h = Math.ceil(alt / PX);
      if (w !== cw || h !== ch) {
        cw = w;
        ch = h;
        gl.bindTexture(gl.TEXTURE_2D, textura);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cw, ch, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, quadroBuf);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textura, 0);
        const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (!ok) desistir();
      }
      sujo = true;
    };

    const quadro = (agora) => {
      raf = requestAnimationFrame(quadro);
      // se os quadros em que a luz desenha ficam lentos, ela sai e a pagina segue leve
      const intervalo = agora - anterior;
      anterior = agora;
      if (desenhou && intervalo < 1000 && agora - inicio > 1200) {
        media = amostras ? media * 0.9 + intervalo * 0.1 : intervalo;
        amostras += 1;
        if (amostras > 20 && media > LENTO) {
          desistir();
          return;
        }
      }
      desenhou = false;
      const parado = reduz.matches;
      const t = parado ? 0 : (agora - inicio) / 1000;
      const ent = parado ? 1 : Math.min(1, (agora - inicio) / ENTRADA);

      const rola = window.scrollY;
      if (rola !== rolaAntes) {
        rolaAntes = rola;
        sujo = true;
      }
      const trocando = agora - troca < TROCA;
      if (trocando) {
        const k = (agora - troca) / TROCA;
        cores = Object.fromEntries(Object.keys(para).map((n) => [n, misturar(de[n], para[n], k)]));
      } else if (cores !== para) {
        cores = para;
        sujo = true;
      }

      // no meio da pagina as duas luzes ficam fora da tela e nao precisa animar
      const tam = Math.min(1.3, Math.max(0.55, larg / 1440));
      const cima = -60 - rola;
      const baixo = docAlt + 60 - rola;
      const aparece = cima + TOPO.raio * tam > 0 || baixo - BASE.raio * tam < alt;
      const respirando = !parado && aparece && agora - ultimo > 33;
      if (!(sujo || ent < 1 || trocando || respirando)) return;
      ultimo = agora;
      sujo = false;
      desenhou = true;

      const meia = Math.min(larg, 1120) / 2;
      const respira = (fase, vel) => (parado ? 1 : 1 + 0.07 * Math.sin(t * vel + fase));

      gl.bindFramebuffer(gl.FRAMEBUFFER, quadroBuf);
      gl.viewport(0, 0, cw, ch);
      usar(campo);
      gl.uniform2f(uc.uCampo, cw, ch);
      gl.uniform1f(uc.uCel, PX);
      gl.uniform1f(uc.uTex, TEXTURA);
      gl.uniform1f(uc.uT, t);
      gl.uniform1f(uc.uRola, rola);
      gl.uniform1f(uc.uEntrada, 1 - (1 - ent) ** 3);
      gl.uniform4f(uc.uL1, larg / 2 + meia * 0.9, cima, TOPO.raio * tam, TOPO.forca * respira(0, 0.7));
      gl.uniform4f(uc.uL2, larg / 2 - meia * 0.85, baixo, BASE.raio * tam, BASE.forca * respira(2, 0.55));
      gl.uniform3fv(uc.uTinta1, unidade(cores.t1));
      gl.uniform3fv(uc.uTinta2, unidade(cores.t2));
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, tela.width, tela.height);
      usar(final);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.uniform1i(uf.uLuz, 0);
      gl.uniform2f(uf.uTam, tela.width, tela.height);
      gl.uniform2f(uf.uCampo, cw, ch);
      gl.uniform1f(uf.uEsc, esc);
      gl.uniform1f(uf.uCel, PX);
      gl.uniform1f(uf.uAlfa, cores.alfa[0]);
      gl.uniform1f(uf.uGanho, GANHO_LINHA);
      gl.uniform3fv(uf.uFundo, unidade(cores.fundo));
      gl.uniform3fv(uf.uLinha, unidade(cores.linha));
      gl.uniform1fv(uf.uLinhas, linhas);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const aoTema = () => {
      de = cores;
      para = lerTema();
      troca = performance.now();
    };
    const aoRedimensionar = () => {
      cancelAnimationFrame(espera);
      espera = requestAnimationFrame(medir);
    };
    const corpo = new ResizeObserver(aoRedimensionar);

    const soltar = () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(espera);
      corpo.disconnect();
      window.removeEventListener('resize', aoRedimensionar);
      window.removeEventListener('temachange', aoTema);
      raiz.classList.remove('luz-on');
    };
    // se a GPU falhar, volta pro fundo de sempre
    function desistir() {
      morto = true;
      soltar();
      tela.hidden = true;
    }

    medir();
    if (morto) return undefined;
    raiz.classList.add('luz-on');
    raf = requestAnimationFrame(quadro);
    corpo.observe(document.body);
    window.addEventListener('resize', aoRedimensionar);
    window.addEventListener('temachange', aoTema);
    tela.addEventListener('webglcontextlost', desistir);

    return () => {
      soltar();
      tela.removeEventListener('webglcontextlost', desistir);
      // devolve o contexto pra GPU: o navegador so aguenta uns poucos por aba
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className="luz" aria-hidden="true" />;
}
