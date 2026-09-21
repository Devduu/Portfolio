/* Cruzes onde uma linha horizontal encontra as colunas do fundo.
   Usa a mesma grade do .amb, entao cai no mesmo pixel das linhas. */
export default function Cruzes() {
  return (
    <div className="cruzes" aria-hidden="true">
      <div className="cruzes__g"><i /><i /><i /><i /></div>
    </div>
  );
}
