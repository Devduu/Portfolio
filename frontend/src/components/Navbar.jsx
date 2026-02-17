/*
Navbar = menu superior do site.
Tem o nome do site e os links para cada seção.
*/
export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="container-default navbar-row">
        {/* Nome no lado esquerdo */}
        <a href="#hero" className="text-slate-100 no-underline">
          Portfólio
        </a>

        {/* Links no lado direito */}
        <div className="navbar-links">
          <a href="#sobre">Sobre</a>
          <a href="#experiencia">Experiência</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>
    </header>
  );
}
