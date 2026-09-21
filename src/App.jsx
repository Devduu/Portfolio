import Ambiente from './components/cenario/Ambiente';
import Cursor from './components/cenario/Cursor';
import Navbar from './components/layout/Navbar';
import MenuLateral from './components/layout/MenuLateral';
import Hero from './components/secoes/Hero';
import Projetos from './components/secoes/Projetos';
import Competencias from './components/secoes/Competencias';
import Trajetoria from './components/secoes/Trajetoria';
import Certificacoes from './components/secoes/Certificacoes';
import Contato from './components/secoes/Contato';
import Rodape from './components/layout/Rodape';
import Separador from './components/cenario/Separador';
import useTema from './hooks/useTema';
import useSecaoAtiva from './hooks/useSecaoAtiva';
import { SECOES_NAV } from './data/perfil';

const IDS = SECOES_NAV.map((s) => s.id);

export default function App() {
  const { claro, alternar } = useTema();
  const ativa = useSecaoAtiva(IDS);

  return (
    <>
      {/* primeiro item do Tab: so aparece quando alguem navega pelo teclado */}
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Ambiente />
      <Cursor />
      <MenuLateral ativa={ativa} />

      <div className="casca">
        <Navbar ativa={ativa} claro={claro} aoAlternarTema={alternar} />
        <main id="conteudo">
          <Hero />
          <Separador />
          <Projetos />
          <Separador />
          <Trajetoria />
          <Separador />
          <Competencias />
          <Separador />
          <Certificacoes />
          <Separador />
          <Contato />
        </main>
        <Rodape />
      </div>
    </>
  );
}
