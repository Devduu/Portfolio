import { useEffect, useState } from 'react';

const FUSO = 'America/Sao_Paulo';

const formatar = new Intl.DateTimeFormat('pt-BR', {
  timeZone: FUSO, hour: '2-digit', minute: '2-digit', hour12: false,
});

/* BRT ou BRST, conforme a epoca do ano. */
function sigla() {
  const nome = new Intl.DateTimeFormat('en-US', { timeZone: FUSO, timeZoneName: 'short' })
    .formatToParts(new Date())
    .find((p) => p.type === 'timeZoneName');
  return nome ? nome.value.replace('GMT-3', 'BRT') : 'BRT';
}

/* Hora de Barueri em partes, pro relogio piscar os dois pontos. Confere
   a cada segundo, mas so troca o estado quando o minuto muda. */
export default function useHoraLocal() {
  const [hora, setHora] = useState({ h: '--', m: '--', sigla: 'BRT' });

  useEffect(() => {
    const tick = () => {
      const partes = formatar.formatToParts(new Date());
      const h = partes.find((p) => p.type === 'hour')?.value ?? '--';
      const m = partes.find((p) => p.type === 'minute')?.value ?? '--';
      setHora((antes) => (antes.h === h && antes.m === m ? antes : { h, m, sigla: sigla() }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return hora;
}
