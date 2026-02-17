const express = require('express');
const projectController = require('../controllers/projectController');

// Cria o objeto de rotas
const router = express.Router();

/*
Rota:
GET /api/projects
Quem responde é o controller (getProjects).
*/
router.get('/', projectController.getProjects);

module.exports = router;
