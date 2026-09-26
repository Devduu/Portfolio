import { TECNOLOGIAS } from '../../data/perfil';
import CabecalhoSecao from '../ui/CabecalhoSecao';
import Revela from '../ui/Revela';
import Logo, { corDaMarca } from '../ui/Logos';
import Cruzes from '../cenario/Cruzes';

/* Uma linha por area. No hover cada item acende na cor da propria marca,
   ou no ambar quando e uma pratica sem marca. */
export default function Competencias() {
  return (
    <section id="competencias" className="faixa">
      <div className="cont sec">
        <CabecalhoSecao
          secao="competencias"
          titulo="Com o que eu trabalho"
          descricao="O que já usei em projeto ou em disciplina."
        />
        <div className="comp">
          {TECNOLOGIAS.map((grupo) => (
            <Revela className="comp__grupo" key={grupo.rotulo}>
              <p className="comp__rot">{grupo.rotulo}</p>
              <ul className="comp__lista">
                {grupo.itens.map((t) => (
                  <li className="tec" key={t.nome} style={corDaMarca(t.logo)}>
                    <Logo nome={t.logo} />
                    <span>
                      {t.nome}
                      {t.etiqueta && <span className="tec__eti">{t.etiqueta}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </Revela>
          ))}
        </div>
      </div>
      <Cruzes />
    </section>
  );
}
