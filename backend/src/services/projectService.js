/*
Service:
- aqui ficam os dados e regras de negócio.
- neste projeto, os dados são fixos (sem banco).
*/
function listProjects() {
  return [
    {
      id: 1,
      title: 'Projeto 1',
      description:
        'Projeto acadêmico desenvolvido com foco em oportunidades no futebol feminino. A plataforma conecta atletas a peneiras e informações relevantes, integrando backend, frontend e organização de dados para facilitar o acesso a oportunidades esportivas.',
      image: '/projects/sprint-passa-bola.png',
      tech: [],
      demoUrl: 'https://example.com/demo-1',
      githubUrl: 'https://github.com/novusscapital/Sprint-Passa-Bola'
    },
    {
      id: 2,
      title: 'Projeto 2',
      description: '',
      image: '/projects/skillhub.png',
      tech: [],
      demoUrl: 'https://example.com/demo-2',
      githubUrl: 'https://github.com/novusscapital/SkillHub_GS25'
    },
    {
      id: 3,
      title: 'Projeto 3',
      description: '',
      image: '/projects/primefit.png',
      tech: [],
      demoUrl: 'https://example.com/demo-3',
      githubUrl: 'https://github.com/novusscapital/Checkpoint5-WebFront'
    }
  ];
}

module.exports = { listProjects };
