const express = require('express');
const cors = require('cors');
const projectRoutes = require('./src/routes/projectRoutes');

// Cria o app Express
const app = express();
// Porta do backend
const PORT = 3001;

/*
PASSO 1: habilitar CORS
Isso permite o frontend acessar o backend.
*/
app.use(cors());

/*
PASSO 2: habilitar JSON
Isso permite receber/enviar dados em JSON.
*/
app.use(express.json());

/*
PASSO 3: usar rota de projetos
Tudo que começar com /api/projects vai para projectRoutes.
*/
app.use('/api/projects', projectRoutes);

/*
PASSO 4: rota simples para teste
Se abrir /api/health e aparecer { status: 'ok' }, API está de pé.
*/
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
