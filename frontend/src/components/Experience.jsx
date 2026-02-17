import javaLogo from '../assets/skills/java.png';
import javascriptLogo from '../assets/skills/javascript.png';
import pythonLogo from '../assets/skills/python.png';
import dockerLogo from '../assets/skills/docker.png';
import reactLogo from '../assets/skills/react.png';
import nodeLogo from '../assets/skills/node.png';
import tailwindLogo from '../assets/skills/tailwindcss.png';

// Lista de tecnologias da seção Experiência
const tecnologias = [
  { nome: 'JavaScript', sigla: 'JS', imagem: javascriptLogo, classeLogo: 'skill-logo-js' },
  { nome: 'Java', sigla: 'JV', imagem: javaLogo },
  { nome: 'Python', sigla: 'PY', imagem: pythonLogo },
  { nome: 'Node.js', sigla: 'ND', imagem: nodeLogo, classeLogo: 'skill-logo-node' },
  { nome: 'React', sigla: 'RE', imagem: reactLogo },
  { nome: 'Tailwind', sigla: 'TW', imagem: tailwindLogo },
  { nome: 'MQTT', sigla: 'MQ' },
  { nome: 'FIWARE', sigla: 'FW' },
  { nome: 'Docker', sigla: 'DK', imagem: dockerLogo }
];

/*
Experiência:
- mostra sua stack em formato visual
- estilo de grade com círculos (base no modelo)
*/
export default function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container-default">
        <h2 className="section-title">Experiência</h2>

        <div className="experience-skills">
          <div className="skills-grid">
            {tecnologias.map((tecnologia) => (
              <article key={tecnologia.nome} className="skill-card">
                <div className="skill-circle">
                  {tecnologia.imagem ? (
                    <img
                      src={tecnologia.imagem}
                      alt={`Logo ${tecnologia.nome}`}
                      className={`skill-logo ${tecnologia.classeLogo || ''}`.trim()}
                    />
                  ) : (
                    <span className="skill-code">{tecnologia.sigla}</span>
                  )}
                </div>
                <p className="skill-name">{tecnologia.nome}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
