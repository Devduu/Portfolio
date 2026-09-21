/* Sol que vira lua, tudo em CSS. O botao so troca o data-tema. */
export default function BotaoTema({ claro, aoAlternar }) {
  return (
    <button
      className="tema dd"
      type="button"
      onClick={aoAlternar}
      aria-label="Alternar tema"
      aria-pressed={claro}
      data-clic
    >
      <svg className="tema__svg" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="mLua">
          <rect x="-4" y="-4" width="32" height="32" fill="#fff" />
          <circle className="tema__mord" cx="24" cy="9.5" r="5.6" fill="#000" />
        </mask>
        <circle className="tema__astro" cx="12" cy="12" r="5" mask="url(#mLua)" />
        <g className="tema__raios">
          <line x1="12" y1="1.4" x2="12" y2="3.4" /><line x1="12" y1="20.6" x2="12" y2="22.6" />
          <line x1="1.4" y1="12" x2="3.4" y2="12" /><line x1="20.6" y1="12" x2="22.6" y2="12" />
          <line x1="4.4" y1="4.4" x2="5.8" y2="5.8" /><line x1="18.2" y1="18.2" x2="19.6" y2="19.6" />
          <line x1="4.4" y1="19.6" x2="5.8" y2="18.2" /><line x1="18.2" y1="5.8" x2="19.6" y2="4.4" />
        </g>
      </svg>
    </button>
  );
}
