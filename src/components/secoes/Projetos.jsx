import { PROJETOS, TECNOLOGIAS } from '../../data/perfil';
import CabecalhoSecao from '../ui/CabecalhoSecao';
import Revela from '../ui/Revela';
import Cruzes from '../cenario/Cruzes';
import Logo, { corDaMarca } from '../ui/Logos';


/* Logo e cor de cada etiqueta, os mesmos da secao de tecnologias.
   Os apelidos sao os nomes que so aparecem aqui, apontando pro item de la. */
const APELIDOS = {
  'TF-IDF': 'vetores', Embeddings: 'vetores', 'Telegram Bot API': 'robo', Webhooks: 'webhook',
  dotenv: 'dotenv', JWT: 'jsonwebtokens', bcrypt: 'escudo', openpyxl: 'arquivos', Vercel: 'vercel',
  Arduino: 'arduino', 'Sensor LDR': 'circuito', 'Display LCD': 'circuito',
};
const LOGOS = new Map(TECNOLOGIAS.flatMap((g) => g.itens.map((t) => [t.nome, t.logo])));
const logoDaEtiqueta = (nome) => APELIDOS[nome] ?? LOGOS.get(nome);

/* Todos os projetos a vista, em cards. Cada card surge ao rolar,
   com um pequeno atraso entre as duas colunas. */
export default function Projetos() {
  return (
    <section id="projetos" className="faixa">
      <div className="cont sec">
        <CabecalhoSecao
          secao="projetos"
          titulo="O que eu já construí"
          descricao="Do mais recente ao mais antigo."
        />
        <div className="proj">
          {PROJETOS.map((p, i) => (
            <Revela className="proj__i" key={p.titulo} atraso={i % 2}>
              <article className="card">
                <div className="card__topo">
                  <span className="card__ano">{p.ano}</span>
                  <span className={p.destaque ? 'eti eti--ac' : 'eti'}>{p.etiqueta}</span>
                </div>
                <h3 className="card__t">{p.titulo}</h3>
                <div className="card__tipo">{p.tipo}</div>
                <p className="card__r">{p.resumo}</p>
                <div className="card__pe">
                  {p.stack.map((s) => (
                    <span className="st" key={s} style={corDaMarca(logoDaEtiqueta(s))}>
                      <Logo nome={logoDaEtiqueta(s)} />
                      {s}
                    </span>
                  ))}
                </div>
                <div className="card__rod">
                  <span className="card__at">{p.atuacao}</span>
                  {p.link && (
                    <a className="card__lk" href={p.link.url} target="_blank" rel="noreferrer">
                      {p.link.texto}
                    </a>
                  )}
                </div>
              </article>
            </Revela>
          ))}
        </div>
      </div>
      <Cruzes />
    </section>
  );
}
