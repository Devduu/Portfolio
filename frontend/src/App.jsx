import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/*
Este é o componente principal.
Ele só organiza a ordem das seções da página.
*/
export default function App() {
  return (
    <>
      {/* Menu fixo no topo */}
      <Navbar />

      {/* Conteúdo principal */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  );
}
