import { useEffect, useRef, useState } from 'react';
import { SECOES_NAV, REDES, PESSOA, numeroDaSecao } from '../../data/perfil';
import BotaoTema from '../ui/BotaoTema';
import Marca from './Marca';
import Cruzes from '../cenario/Cruzes';
import Separador from '../cenario/Separador';
import { ICONES, IconeMenu, IconeSeta, IconeSetaDiagonal, IconeX } from '../ui/Icones';

/* O cabecalho rola junto com a pagina, entao o menu abre a partir do topo.
   Ele usa a mesma grade do site e trava a rolagem de tras enquanto aberto. */
export default function Navbar({ ativa, claro, aoAlternarTema }) {
  const [aberto, setAberto] = useState(false);
  const botao = useRef(null);
  const saida = useRef(null);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.classList.toggle('menu-on', aberto);
    if (!aberto) return undefined;
    saida.current?.focus();
    const tecla = (e) => { if (e.key === 'Escape') { setAberto(false); botao.current?.focus(); } };
    window.addEventListener('keydown', tecla);
    return () => {
      window.removeEventListener('keydown', tecla);
      raiz.classList.remove('menu-on');
    };
  }, [aberto]);

  const fechar = () => setAberto(false);
  const total = SECOES_NAV.length;

  return (
    <>
      <header className="nav">
        <div className="cont nav__grade">
          <a href="#topo" className="nav__marca" aria-label="Voltar ao topo">
            <Marca />
            <span className="sr">Eduardo Delorenzo Moraes</span>
          </a>
          <div className="nav__dir">
            <BotaoTema claro={claro} aoAlternar={aoAlternarTema} />
            <button
              ref={botao}
              className="redondo dd"
              type="button"
              aria-expanded={aberto}
              aria-controls="menu"
              aria-label="Abrir menu"
              onClick={() => setAberto(true)}
            >
              <IconeMenu />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={aberto ? 'menu menu--on' : 'menu'} inert={aberto ? undefined : ''}>
        <div className="menu__fundo" aria-hidden="true">
          <div className="amb__g"><i className="amb__c" /><i className="amb__c" /><i className="amb__c" /><i className="amb__c" /></div>
        </div>

        <div className="menu__topo">
          <div className="cont menu__barra">
            <p className="menu__eb"><b>[ + ]</b> Navegação</p>
            <div className="nav__dir">
              <BotaoTema claro={claro} aoAlternar={aoAlternarTema} />
              <button
                ref={saida}
                className="redondo dd"
                type="button"
                aria-label="Fechar menu"
                onClick={() => { fechar(); botao.current?.focus(); }}
              >
                <IconeX />
              </button>
            </div>
          </div>
          <Cruzes />
        </div>

        <div className="menu__corpo">
          <div className="cont menu__painel">
            <nav className="menu__secoes" aria-label="Seções">
              <ul>
                {SECOES_NAV.map((s, i) => (
                  <li key={s.id} style={{ '--i': i }}>
                    <a
                      className="menu__it dd"
                      href={`#${s.id}`}
                      onClick={fechar}
                      aria-current={ativa === s.id ? 'true' : undefined}
                    >
                      <span className="menu__n">{numeroDaSecao(s.id)}</span>
                      <span className="menu__r">{s.rotulo}</span>
                      <span className="menu__f" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="cont menu__acoes" style={{ '--i': total }}>
          <a className="btn btn--ac" href="#contato" onClick={fechar}>
            Fale comigo
            <IconeSeta />
          </a>
          {REDES.map((r) => {
            const Icone = ICONES[r.icone];
            return (
              <a
                key={r.nome}
                className="btn dd"
                href={r.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${r.nome} (abre em nova aba)`}
              >
                <Icone />
                {r.nome}
                <IconeSetaDiagonal />
              </a>
            );
          })}
        </div>

        <Separador />

        <div className="cont menu__pe">
          <span>{PESSOA.handle}</span>
          <span className="menu__esc"><b>[ esc ]</b> fechar</span>
        </div>
      </div>
    </>
  );
}
