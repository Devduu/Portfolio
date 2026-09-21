import { useEffect, useRef, useState } from 'react';
import { PESSOA, REDES, DISPONIBILIDADE } from '../../data/perfil';
import CabecalhoSecao from '../ui/CabecalhoSecao';
import Revela from '../ui/Revela';
import { IconeCerto, IconeCopiar } from '../ui/Icones';
import Cruzes from '../cenario/Cruzes';

/* Copia o texto; se o navegador bloquear a API nova, tenta o jeito antigo. */
async function copiarTexto(texto) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

export default function Contato() {
  const [copiado, setCopiado] = useState(false);
  const tempo = useRef(0);

  useEffect(() => () => clearTimeout(tempo.current), []);

  const copiar = async () => {
    if (!(await copiarTexto(PESSOA.email))) return;
    setCopiado(true);
    clearTimeout(tempo.current);
    tempo.current = setTimeout(() => setCopiado(false), 2200);
  };

  return (
    <section id="contato" className="faixa">
      <div className="cont sec">
        <CabecalhoSecao
          secao="contato"
          titulo="Onde me encontrar"
          descricao="Aberto a conversas sobre estágio e projeto."
        />
        <div className="ct">
          <Revela className="ct__linha">
            <a className="ct__mail" href={`mailto:${PESSOA.email}`}>{PESSOA.email}</a>
            <button type="button" className={copiado ? 'btn btn--ac dd' : 'btn dd'} onClick={copiar}>
              {copiado ? <IconeCerto /> : <IconeCopiar />}
              <span aria-live="polite">{copiado ? 'Copiado' : 'Copiar'}</span>
            </button>
          </Revela>
          <Revela como="p" className="ct__sub" atraso={1}>
            O jeito mais rápido de falar comigo é por <span className="nq">e-mail</span>. Se preferir, LinkedIn e GitHub logo abaixo.
          </Revela>
          <Revela className="ct__lk" atraso={2}>
            {REDES.map((r) => (
              <a key={r.nome} href={r.url} target="_blank" rel="noreferrer">{r.nome} ↗</a>
            ))}
            {PESSOA.curriculo && <a href={PESSOA.curriculo} download>Currículo ↓</a>}
          </Revela>
          <dl className="ct__base">
            {DISPONIBILIDADE.map((d, i) => (
              <Revela className="ct__c" key={d.rot} atraso={i}>
                <dt className="rot">{d.rot}</dt>
                <dd className="ficha__v">{d.valor}</dd>
              </Revela>
            ))}
          </dl>
        </div>
      </div>
      <Cruzes />
    </section>
  );
}
