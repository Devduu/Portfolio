import foto from '../../assets/profile/profile.jpg';
import { PESSOA, FICHA, REDES } from '../../data/perfil';
import { ICONES, IconeSeta } from '../ui/Icones';
import Cruzes from '../cenario/Cruzes';
import Relogio from '../ui/Relogio';

// palavra com hifen (back-end) nao pode quebrar no meio da linha
const semQuebra = (texto) =>
  texto.split(/(\S+-\S+)/).map((parte, i) => (i % 2 ? <span className="nq" key={i}>{parte}</span> : parte));

/* Topo em duas colunas; no celular a foto e a ficha sobem pra cima.
   A entrada e so CSS e roda uma vez, no carregamento. */
export default function Hero() {
  return (
    <section id="topo" className="faixa">
      <div className="cont hero">
        <div className="hero__texto">
          <h1 className="hero__nome">
            <span className="mascara"><span>{PESSOA.nome}</span></span>
            <span className="mascara"><span>{PESSOA.sobrenome}</span></span>
          </h1>
          <div className="hero__sub">
            <span className="hero__handle">{PESSOA.handle}</span>
            <span className="hero__bar">/</span>
            <span className="hero__head">{PESSOA.chamada}</span>
          </div>

          <p className="hero__bio">{semQuebra(PESSOA.resumo)}</p>

          <div className="hero__ac">
            <a className="cta" href="#contato">
              Falar comigo
              <IconeSeta />
            </a>
            {PESSOA.curriculo && (
              <a className="btn dd" href={PESSOA.curriculo} download>Currículo ↓</a>
            )}
            <ul className="hero__redes">
              {REDES.map((r) => {
                const Icone = ICONES[r.icone];
                return (
                  <li key={r.nome}>
                    <a
                      className="rede dd"
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${r.nome} (abre em nova aba)`}
                      title={r.nome}
                    >
                      <Icone />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="hero__cartao">
          <div className="hero__foto">
            <img src={foto} alt={`${PESSOA.nome} ${PESSOA.sobrenome}`} width="828" height="1472" />
          </div>
          <dl className="ficha">
            {FICHA.map((c) => (
              <div className={c.destaque ? 'ficha__c ficha__c--destaque' : 'ficha__c'} key={c.rot}>
                <dt className="rot">{c.rot}</dt>
                <dd className="ficha__v">
                  {c.destaque && <span className="pt" />}
                  {c.valor === 'relogio' ? <Relogio /> : c.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Cruzes />
    </section>
  );
}
