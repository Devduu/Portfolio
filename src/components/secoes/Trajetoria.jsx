import { Fragment } from 'react';
import { HISTORIA, TRAJETORIA } from '../../data/perfil';
import CabecalhoSecao from '../ui/CabecalhoSecao';
import Revela from '../ui/Revela';
import { IconeSetaBaixo } from '../ui/Icones';
import Cruzes from '../cenario/Cruzes';

/* A linha do tempo se desenha em ambar conforme a rolagem, onde o
   navegador suporta; nos outros ela ja nasce inteira, em cinza. */
export default function Trajetoria() {
  return (
    <section id="trajetoria" className="faixa">
      <div className="cont sec">
        <CabecalhoSecao
          secao="trajetoria"
          titulo="Como cheguei até aqui"
          descricao="Da área administrativa à engenharia de software."
        />
        <div className="traj">
          <div className="traj__historia">
            {HISTORIA.map((paragrafo, i) => (
              <Revela como="p" key={i} atraso={i}>
                {paragrafo.map((trecho, j) => (
                  <Fragment key={j}>
                    {typeof trecho === 'string' ? trecho : <b>{trecho.b}</b>}
                  </Fragment>
                ))}
              </Revela>
            ))}
          </div>

          <ol className="linha">
            {TRAJETORIA.map((r, i) => (
              <Revela
                como="li"
                key={r.nome}
                atraso={i}
                className={r.atual ? 'linha__i linha__i--atual' : 'linha__i'}
              >
                <p className="linha__per">{r.periodo}</p>
                <h3 className="linha__nome">{r.nome}</h3>
                <p className="linha__org">{r.org}</p>
                {r.detalhe && <p className="linha__det">{r.detalhe}</p>}
                {r.link && (
                  <a className="lk linha__lk" href={r.link.href}>
                    {r.link.texto}
                    <IconeSetaBaixo />
                  </a>
                )}
              </Revela>
            ))}
          </ol>
        </div>
      </div>
      <Cruzes />
    </section>
  );
}
