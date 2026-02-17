const projectService = require('../services/projectService');

/*
Controller:
- recebe a requisição
- chama o service
- devolve resposta para o frontend
*/
function getProjects(_req, res) {
  try {
    // Busca os projetos no service
    const projects = projectService.listProjects();

    // Retorna status 200 (sucesso) + JSON
    res.status(200).json(projects);
  } catch (_error) {
    // Se der erro, retorna status 500
    res.status(500).json({ message: 'Erro ao buscar projetos.' });
  }
}

module.exports = { getProjects };
