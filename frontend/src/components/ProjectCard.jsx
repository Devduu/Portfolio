/*
ProjectCard = card de 1 projeto.
Recebe os dados via props: { project }.
*/
export default function ProjectCard({ project }) {
  return (
    <article className="card">
      {/* Imagem do projeto */}
      <img src={project.image} alt="Imagem do projeto" className="project-image" />

      {/* Botões do card */}
      <div className="row">
        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
          Demo
        </a>

        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary">
          GitHub
        </a>
      </div>
    </article>
  );
}
