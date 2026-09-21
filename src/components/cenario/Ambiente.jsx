import Luz from './Luz';

/* Fundo da pagina: a luz em dither, as colunas verticais finas e o grao. */
export default function Ambiente() {
  return (
    <>
      <Luz />
      <div className="amb">
        <div className="amb__g">
          <div className="amb__c" /><div className="amb__c" />
          <div className="amb__c" /><div className="amb__c" />
        </div>
      </div>
      <div className="grao" />
    </>
  );
}
