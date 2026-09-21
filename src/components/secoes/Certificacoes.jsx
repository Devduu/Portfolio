import { useEffect, useState } from 'react';
import {
  CERTIFICACOES, HORAS_CURSOS, TOTAL_CURSOS, ANO_PRIMEIRO_CURSO,
  horasDaInstituicao, cursosDaInstituicao,
} from '../../data/perfil';
import CabecalhoSecao from '../ui/CabecalhoSecao';
import Revela from '../ui/Revela';
import Contador from '../ui/Contador';
import { IconeSetaDiagonal } from '../ui/Icones';
import Cruzes from '../cenario/Cruzes';

/* Totais, barra de horas e um card por instituicao, tudo somado de
   CERTIFICACOES. O mouse destaca uma instituicao nas tres partes de uma
   vez; o clique fixa o destaque ate clicar de novo, em Limpar ou no Esc. */
// quantos cursos cada card mostra antes do "+ N cursos"
const VISIVEIS = 4;

export default function Certificacoes() {
  const [foco, setFoco] = useState(-1); // mouse em cima
  const [fixo, setFixo] = useState(-1); // clicado
  const [abertos, setAbertos] = useState({}); // cards com a lista inteira aberta

  useEffect(() => {
    if (fixo === -1) return undefined;
    const soltar = (e) => {
      if (e.key === 'Escape') setFixo(-1);
    };
    window.addEventListener('keydown', soltar);
    return () => window.removeEventListener('keydown', soltar);
  }, [fixo]);

  const blocos = CERTIFICACOES.map((c, i) => {
    const horas = horasDaInstituicao(c);
    return {
      ...c,
      horas,
      cursos: cursosDaInstituicao(c),
      parte: Math.round((horas / HORAS_CURSOS) * 100),
      cor: { '--cor': `var(--cert-${i + 1})`, '--tinta': `var(--cert-${i + 1}-tinta)` },
    };
  });

  const totais = [
    { valor: HORAS_CURSOS, unidade: 'h', rot: 'Formação complementar' },
    { valor: TOTAL_CURSOS, rot: 'Cursos concluídos' },
    { valor: CERTIFICACOES.length, rot: 'Instituições' },
  ];

  // com algo fixo, o mouse nao troca o destaque
  const ativo = fixo !== -1 ? fixo : foco;
  // on: o destacado; apagado: os outros; fixo: o que foi clicado
  const estado = (i) => {
    let classes = '';
    if (ativo !== -1) classes += ativo === i ? ' on' : ' apagado';
    if (fixo === i) classes += ' fixo';
    return classes;
  };
  const alternar = (i) => setFixo((atual) => (atual === i ? -1 : i));
  const focar = (i) => ({ onMouseEnter: () => setFoco(i), onMouseLeave: () => setFoco(-1) });
  // link e botao dentro do card cuidam do proprio clique; duplo clique e texto selecionado nao contam
  const clicarCard = (i) => (e) => {
    if (e.detail > 1 || e.target.closest('a, button') || String(window.getSelection())) return;
    alternar(i);
  };

  return (
    <section id="certificacoes" className="faixa">
      <div className={fixo === -1 ? 'cont sec' : 'cont sec cert--fixo'}>
        <CabecalhoSecao
          secao="certificacoes"
          titulo="O que estudo além da graduação"
          descricao={`Cursos concluídos desde ${ANO_PRIMEIRO_CURSO}.`}
        />

        <dl className="cert__nums">
          {totais.map((n, i) => (
            <Revela className="cert__num" key={n.rot} atraso={i}>
              <dt className="rot">{n.rot}</dt>
              <dd className="cert__v">
                <Contador valor={n.valor} />
                {n.unidade && <span className="cert__u">{n.unidade}</span>}
              </dd>
            </Revela>
          ))}
        </dl>

        <Revela className="cert__comp">
          <div className="cert__topo">
            <p className="rot">Horas por instituição</p>
            <button type="button" className="cert__limpa" onClick={() => setFixo(-1)}>
              Limpar <span aria-hidden="true">×</span>
            </button>
          </div>
          {/* a legenda faz o mesmo papel no teclado e no leitor de tela */}
          <div className="cert__barra" aria-hidden="true">
            {blocos.map((b, i) => (
              <span
                key={b.instituicao}
                className={`cert__seg${estado(i)}`}
                style={{ flexGrow: b.horas, '--i': i, ...b.cor }}
                data-clic
                onClick={() => alternar(i)}
                {...focar(i)}
              >
                <span className="cert__h">{b.horas} h</span>
              </span>
            ))}
          </div>
          <ul className="cert__leg">
            {blocos.map((b, i) => (
              <li key={b.instituicao} className={`cert__li${estado(i)}`} style={b.cor}>
                <button type="button" className="cert__bt" aria-pressed={fixo === i} onClick={() => alternar(i)} {...focar(i)}>
                  <span className="cert__q" aria-hidden="true" />
                  <span className="cert__ln">{b.instituicao}</span>
                  <span className="cert__lm">{b.parte}%</span>
                </button>
              </li>
            ))}
          </ul>
        </Revela>

        <div className="cert__grade">
          {blocos.map((b, i) => (
            <Revela className="cert__cel" key={b.instituicao} atraso={i}>
              <article
                className={`cert__card${estado(i)}`}
                style={{ '--parte': b.parte / 100, ...b.cor }}
                data-clic
                onClick={clicarCard(i)}
                {...focar(i)}
              >
                <header className="cert__cab">
                  <h3 className="cert__nome">
                    <button type="button" className="cert__bt" aria-pressed={fixo === i} onClick={() => alternar(i)}>
                      <span className="cert__q" aria-hidden="true" />
                      {b.instituicao}
                    </button>
                  </h3>
                  <span className="cert__pct">{b.parte}%</span>
                </header>
                <p className="cert__meta">
                  {b.horas} h · {b.cursos} {b.cursos === 1 ? 'curso' : 'cursos'}
                </p>
                <ListaCursos itens={b.itens.slice(0, VISIVEIS)} />
                {b.itens.length > VISIVEIS && (
                  <>
                    <div
                      id={`cert-resto-${i}`}
                      className={abertos[i] ? 'cert__resto aberto' : 'cert__resto'}
                      inert={abertos[i] ? undefined : ''}
                    >
                      <div>
                        <ListaCursos itens={b.itens.slice(VISIVEIS)} />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cert__mais dd"
                      aria-expanded={Boolean(abertos[i])}
                      aria-controls={`cert-resto-${i}`}
                      onClick={() => setAbertos((a) => ({ ...a, [i]: !a[i] }))}
                    >
                      {abertos[i] ? 'Mostrar menos' : `+ ${b.itens.length - VISIVEIS} cursos`}
                    </button>
                  </>
                )}
                {(b.nota || b.link) && (
                  <footer className="cert__pe">
                    {b.nota && <p>{b.nota}</p>}
                    {b.link && (
                      <a className="lk" href={b.link.url} target="_blank" rel="noreferrer">
                        {b.link.texto}
                        <IconeSetaDiagonal />
                      </a>
                    )}
                  </footer>
                )}
              </article>
            </Revela>
          ))}
        </div>
      </div>
      <Cruzes />
    </section>
  );
}

function ListaCursos({ itens }) {
  return (
    <ul className="cert__cursos">
      {itens.map((it) => (
        <li key={it.nome}>
          <span className="cert__cn">{it.nome}</span>
          <span className="cert__cm">{it.h ? `${it.h} h · ${it.ano}` : it.ano}</span>
        </li>
      ))}
    </ul>
  );
}
