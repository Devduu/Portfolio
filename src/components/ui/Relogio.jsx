import useHoraLocal from '../../hooks/useHoraLocal';

/* Hora de Barueri com os dois pontos piscando. Fica num componente
   separado pra so ele redesenhar quando o minuto vira. */
export default function Relogio() {
  const { h, m, sigla } = useHoraLocal();
  return (
    <time>
      <span className="sr">{`${h}:${m} ${sigla}`}</span>
      <span aria-hidden="true">
        {h}<span className="relogio__pisca">:</span>{m} {sigla}
      </span>
    </time>
  );
}
