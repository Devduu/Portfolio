import useRevelar from '../../hooks/useRevelar';

/* Envolve um bloco que surge ao rolar; "atraso" escalona itens de uma
   lista. Hover e transicoes proprias ficam num elemento de dentro, senao
   o atraso da entrada atrasa o hover junto. */
export default function Revela({ como: Tag = 'div', atraso = 0, style, children, ...resto }) {
  const ref = useRevelar();
  return (
    <Tag ref={ref} data-rv="" style={atraso ? { ...style, '--rv': atraso } : style} {...resto}>
      {children}
    </Tag>
  );
}
