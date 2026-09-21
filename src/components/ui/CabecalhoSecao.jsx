import { SECOES_NAV, numeroDaSecao } from '../../data/perfil';
import Revela from './Revela';

/* Cabecalho igual em toda secao. O numero e o nome vem de SECOES_NAV,
   nunca digitados. */
export default function CabecalhoSecao({ secao, titulo, descricao }) {
  const rotulo = SECOES_NAV.find((s) => s.id === secao)?.rotulo;
  return (
    <Revela className="sec__cab">
      <p className="sec__eb">
        <span className="sec__n">[ {numeroDaSecao(secao)} ]</span>
        {rotulo}
      </p>
      <h2 className="sec__t"><span>{titulo}</span></h2>
      <p className="sec__d">{descricao}</p>
    </Revela>
  );
}
