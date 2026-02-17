import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

/*
Projects = seção que busca os projetos no backend.
Fluxo:
1) começa carregando
2) chama a API
3) salva os dados no estado
4) mostra os cards
*/
export default function Projects() {
  // Guarda a lista de projetos
  const [projetos, setProjetos] = useState([]);
  // Diz se ainda está carregando
  const [carregando, setCarregando] = useState(true);
  // Guarda mensagem de erro (se acontecer)
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((resposta) => {
        // Se a resposta não for OK, lança erro
        if (!resposta.ok) {
          throw new Error('Erro ao carregar projetos.');
        }

        // Converte resposta para JSON
        return resposta.json();
      })
      .then((dados) => {
        // Salva dados no estado
        setProjetos(dados);
      })
      .catch((e) => {
        // Salva mensagem de erro
        setErro(e.message);
      })
      .finally(() => {
        // Finaliza loading
        setCarregando(false);
      });
  }, []);

  return (
    <section id="projetos" className="section">
      <div className="container-default">
        <h2 className="section-title">Projetos</h2>

        {/* Mensagem enquanto carrega */}
        {carregando && <p>Carregando...</p>}

        {/* Mensagem de erro */}
        {erro && <p className="text-red-400">{erro}</p>}

        {/* Lista de cards */}
        {!carregando && !erro && (
          <div className="projects-grid">
            {projetos.map((projeto) => (
              <ProjectCard key={projeto.id} project={projeto} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
