/* Todo o conteudo do portfolio em um lugar so.
   Pra mudar texto do site, mexe aqui e nao no componente. */

export const PESSOA = {
  nome: 'Eduardo',
  sobrenome: 'Delorenzo Moraes',
  handle: '@Devduu',
  chamada: 'Python · JavaScript · React',
  resumo: 'Estudante de Engenharia de Software na FIAP, com foco em back-end, automação de processos e IA aplicada.',
  email: 'eduardodmoraes@icloud.com',
  github: 'https://github.com/Devduu',
  linkedin: 'https://www.linkedin.com/in/eduardo-delorenzo-moraes-23654a325/',
  /* Curriculo em PDF: coloque o arquivo na pasta public e escreva o caminho
     aqui (ex.: '/curriculo-eduardo-moraes.pdf'). Enquanto for null, os
     botoes de Curriculo do topo e do contato ficam escondidos. */
  curriculo: null,
};

/* Botoes redondos embaixo do nome. O desenho de cada icone fica em
   components/Icones.jsx, pela chave "icone". */
export const REDES = [
  { nome: 'GitHub', url: PESSOA.github, icone: 'github' },
  { nome: 'LinkedIn', url: PESSOA.linkedin, icone: 'linkedin' },
];

/* Ficha embaixo da foto. valor 'relogio' mostra a hora de Barueri ao vivo.
   O curso ja esta na frase do topo, e turno e modelo ficaram no contato. */
export const FICHA = [
  { rot: 'Status', valor: 'Buscando o primeiro estágio', destaque: true },
  { rot: 'Localização', valor: 'Barueri, São Paulo' },
  { rot: 'Hora local', valor: 'relogio' },
];

export const PROJETOS = [
  {
    ano: '2026', etiqueta: 'Em andamento', destaque: true,
    titulo: 'Cérebro Comercial · Challenge FIAP x TOTVS',
    tipo: 'Projeto acadêmico com empresa parceira',
    resumo: 'Analisa transcrições de reuniões comerciais e extrai indicadores de relacionamento, risco de perda de cliente e oportunidades de expansão.',
    stack: ['Python', 'TF-IDF', 'Embeddings'],
    atuacao: 'Requisitos e desenvolvimento · Grupo InovaLink',
  },
  {
    ano: '2026', etiqueta: 'Repositório',
    titulo: 'Chatbot de Atendimento para Self Storage',
    tipo: 'Projeto pessoal',
    resumo: 'Atendimento automatizado para uma empresa de self storage: responde a dúvidas sobre produtos, valores, contratos e agendamento de visitas.',
    stack: ['Node.js', 'Express', 'Telegram Bot API', 'Webhooks', 'dotenv'],
    atuacao: 'Projeto individual',
    link: { texto: 'Ver o repositório ↗', url: 'https://github.com/Devduu/chatbot-selfstorage' },
  },
  {
    ano: '2026', etiqueta: 'No ar', destaque: true,
    titulo: 'Dashboard do Mercado de Desenvolvimento',
    tipo: 'Projeto acadêmico · FIAP',
    resumo: 'Caracteriza o mercado brasileiro de desenvolvimento a partir dos microdados da Stack Overflow Survey 2025. 49.191 respondentes, 825 brasileiros.',
    stack: ['Python', 'Streamlit', 'pandas', 'NumPy', 'SciPy', 'Plotly'],
    atuacao: 'Projeto individual',
    link: { texto: 'Acessar o projeto ↗', url: 'https://cp4-dashboard-mercado-dev-br.streamlit.app/' },
  },
  {
    ano: '2026', etiqueta: 'Repositório',
    titulo: 'Análise de Expectativa de Gols no Brasileirão',
    tipo: 'Projeto acadêmico · FIAP',
    resumo: 'Identifica quais times do Brasileirão aproveitam e quais desperdiçam as chances que criam, usando Expectativa de Gols como referência.',
    stack: ['Python', 'Streamlit', 'pandas', 'NumPy', 'SciPy', 'Plotly'],
    atuacao: 'Desenvolvimento e análise',
    link: { texto: 'Ver o repositório ↗', url: 'https://github.com/InovaLink-Challenge-Fiap/CP3-estatistica-futebol' },
  },
  {
    ano: '2026', etiqueta: 'Repositório',
    titulo: 'Dashboard de Produtividade em Obras',
    tipo: 'Projeto acadêmico · FIAP',
    resumo: 'Analisa dados diários de apropriação de obras da construção civil, com foco no índice de produtividade da mão de obra.',
    stack: ['Python', 'Streamlit', 'pandas', 'Plotly', 'openpyxl'],
    atuacao: 'Em equipe · Grupo InovaLink',
    link: { texto: 'Ver o repositório ↗', url: 'https://github.com/InovaLink-Challenge-Fiap/dashboard-produtividade-obras' },
  },
  {
    ano: '2026', etiqueta: 'No ar', destaque: true,
    titulo: 'POLARIS · Página Institucional',
    tipo: 'FIAP Global Solution 2026',
    resumo: 'Página institucional de um conceito que converte dados de satélite em informação para monitoramento ambiental e gestão de frota autônoma.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    atuacao: 'Projeto individual',
    link: { texto: 'Acessar o projeto ↗', url: 'https://gs-2026-polaris.vercel.app' },
  },
  {
    ano: '2025 - 2026', etiqueta: 'No ar', destaque: true,
    titulo: 'Elas em Campo · Passa Bola',
    tipo: 'Challenge FIAP · 1º ano',
    resumo: 'Plataforma para o futebol feminino de base: calendário de peneiras com mapa, notícias e área autenticada com perfis e administração.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'JWT', 'bcrypt'],
    atuacao: 'Integral · correção de segurança',
    link: { texto: 'Acessar o projeto ↗', url: 'https://passa-bola-mocha.vercel.app' },
  },
  {
    ano: '2025', etiqueta: 'Demonstração',
    titulo: 'Sistema de Monitoramento de Luminosidade',
    tipo: 'Projeto acadêmico · FIAP',
    resumo: 'Sistema embarcado que monitora a luminosidade na conservação de vinhos, com sinalização por faixas críticas e média móvel para estabilizar a leitura.',
    stack: ['Arduino', 'C++', 'Sensor LDR', 'Display LCD'],
    atuacao: 'Circuito e lógica de controle',
    link: { texto: 'Ver a demonstração ↗', url: 'https://www.youtube.com/watch?v=UPNF_IrzjGA' },
  },
];

/* ---------- certificacoes ----------
   Cada curso guarda a carga (h) como numero, entao todo total da pagina e
   somado daqui. Curso sem carga informada (h: null) conta como curso, mas
   fica fora da soma de horas. */
export const CERTIFICACOES = [
  {
    instituicao: 'FIAP',
    itens: [
      { nome: 'Python', h: 80, ano: '2026' },
      { nome: 'Formação Social e Sustentabilidade', h: 80, ano: '2025' },
      { nome: 'Resolvendo Problemas com Matemática', h: 60, ano: '2025' },
      { nome: 'Blockchain', h: 40, ano: '2025' },
      { nome: 'Blockchain Advanced', h: 40, ano: '2025' },
      { nome: 'Design Thinking - Process', h: 40, ano: '2025' },
      { nome: 'Gestão de Infraestrutura de TI', h: 20, ano: '2026' },
      { nome: 'Gestão Financeira de Empresas', h: 20, ano: '2026' },
    ],
  },
  {
    instituicao: 'Alura',
    /* as 4 linhas sao formacoes e blocos de cursos; o certificado publico
       nomeia 34 cursos individuais, e e esse numero que entra na contagem */
    cursos: 34,
    nota: 'As 4 linhas reúnem 34 cursos, todos nomeados no certificado público.',
    link: { texto: 'Verificar certificado', url: 'https://cursos.alura.com.br/user/Eduardodmoraes/fullCertificate/54f67c90fcff1083b0026cfac22b3afe' },
    itens: [
      { nome: 'Cursos de Back-end: Java, Python, JavaScript e Git', h: 150, ano: '2023-2026' },
      { nome: 'Formação Comunicação', h: 49, ano: '2023' },
      { nome: 'Formação Aprenda a programar em Java com Orientação a Objetos', h: 36, ano: '2023' },
      { nome: 'Cursos de Front-end: HTML e CSS', h: 28, ano: '2023-2025' },
    ],
  },
  {
    instituicao: 'Senai São Paulo',
    itens: [
      { nome: 'Microsoft Power BI', h: null, ano: '2024' },
      { nome: 'Economia Circular', h: 20, ano: '2023' },
      { nome: 'Web 3.0', h: 20, ano: '2024' },
      { nome: 'Excel Básico', h: 20, ano: '2024' },
      { nome: 'Desvendando a Indústria 4.0', h: 20, ano: '2024' },
      { nome: 'Desvendando o 5G', h: 15, ano: '2023' },
      { nome: 'Preparação para o Mundo do Trabalho', h: 14, ano: '2024' },
      { nome: 'Competência Transversal: Segurança no Trabalho', h: 14, ano: '2024' },
      { nome: 'Ética na Inteligência Artificial', h: 4, ano: '2024' },
      { nome: 'Privacidade e Proteção de Dados (LGPD)', h: 4, ano: '2023' },
    ],
  },
];

export const horasDaInstituicao = (c) => c.itens.reduce((soma, i) => soma + (i.h || 0), 0);
export const cursosDaInstituicao = (c) => c.cursos ?? c.itens.length;
export const HORAS_CURSOS = CERTIFICACOES.reduce((soma, c) => soma + horasDaInstituicao(c), 0);
export const TOTAL_CURSOS = CERTIFICACOES.reduce((soma, c) => soma + cursosDaInstituicao(c), 0);
export const ANO_PRIMEIRO_CURSO = Math.min(
  ...CERTIFICACOES.flatMap((c) => c.itens.map((i) => parseInt(i.ano, 10))),
);

/* ---------- tecnologias ----------
   As mesmas areas e itens da aba Skills do dashboard.
   "logo" e a chave do desenho em components/Logos.jsx: marca (Simple Icons)
   ou icone (Phosphor), pra pratica que nao tem marca. */
export const TECNOLOGIAS = [
  {
    rotulo: 'Linguagens',
    itens: [
      { nome: 'Python', logo: 'python' },
      { nome: 'JavaScript', logo: 'javascript' },
      { nome: 'TypeScript', logo: 'typescript' },
      { nome: 'C++', logo: 'cplusplus' },
      { nome: 'HTML', logo: 'html5' },
      { nome: 'CSS', logo: 'css' },
    ],
  },
  {
    rotulo: 'Back-end e integrações',
    itens: [
      { nome: 'Node.js', logo: 'nodedotjs' },
      { nome: 'Express', logo: 'express' },
      { nome: 'APIs REST', logo: 'api' },
      { nome: 'Consumo de APIs de terceiros', logo: 'nuvem' },
      { nome: 'Integração via webhooks', logo: 'webhook' },
      { nome: 'Autenticação com JWT e bcrypt', logo: 'jsonwebtokens' },
      { nome: 'Variáveis de ambiente e segredos', logo: 'dotenv' },
    ],
  },
  {
    rotulo: 'Front-end',
    itens: [
      { nome: 'React', logo: 'react' },
      { nome: 'Next.js', logo: 'nextdotjs' },
      { nome: 'Tailwind CSS', logo: 'tailwindcss' },
      { nome: 'Vite', logo: 'vite' },
      { nome: 'Desenvolvimento responsivo', logo: 'responsivo' },
    ],
  },
  {
    rotulo: 'Dados e estatística',
    itens: [
      { nome: 'pandas', logo: 'pandas' },
      { nome: 'NumPy', logo: 'numpy' },
      { nome: 'SciPy', logo: 'scipy' },
      { nome: 'Plotly', logo: 'plotly' },
      { nome: 'Streamlit', logo: 'streamlit' },
      { nome: 'Estatística descritiva e inferencial', logo: 'estatistica' },
      { nome: 'Intervalos de confiança e testes de hipótese', logo: 'hipotese' },
      { nome: 'Tratamento de outliers', logo: 'outliers' },
      { nome: 'Limpeza e preparação de bases', logo: 'limpeza' },
      { nome: 'Análise exploratória', logo: 'exploratoria' },
    ],
  },
  {
    rotulo: 'Inteligência artificial',
    itens: [
      { nome: 'TF-IDF e embeddings', logo: 'vetores' },
      { nome: 'Automação de atendimento', logo: 'robo' },
      { nome: 'Ética e uso responsável de IA', logo: 'etica' },
    ],
  },
  {
    rotulo: 'Banco de dados',
    itens: [
      { nome: 'SQL e modelagem relacional', logo: 'sql' },
      { nome: 'Arquivos CSV, JSON e XLSX', logo: 'arquivos' },
    ],
  },
  {
    rotulo: 'Sistemas embarcados',
    itens: [
      { nome: 'C++ com Arduino', logo: 'arduino' },
      { nome: 'ESP32', logo: 'espressif' },
      { nome: 'Sensor LDR e display LCD', logo: 'circuito' },
      { nome: 'Média móvel para estabilizar a leitura', logo: 'onda' },
    ],
  },
  {
    rotulo: 'Ferramentas e metodologias',
    itens: [
      { nome: 'Git', logo: 'git' },
      { nome: 'GitHub', logo: 'github' },
      { nome: 'Deploy em nuvem (Vercel)', logo: 'vercel' },
      { nome: 'Metodologias ágeis (Scrum)', logo: 'ciclo' },
      { nome: 'Design Thinking', logo: 'ideia' },
      { nome: 'Documentação técnica', logo: 'documento' },
      { nome: 'LGPD e proteção de dados', logo: 'escudo' },
    ],
  },
];

/* ---------- trajetoria ----------
   A historia e contada em paragrafos. Cada trecho e texto comum ou
   { b: '...' } pra destacar. Os detalhes de cada experiencia ficam no
   curriculo. */
export const HISTORIA = [
  [
    'Minha trajetória começou na área administrativa. Por um ano e meio fui aprendiz na Companhia Brasileira de Alumínio, enquanto cursava o técnico em Administração no Senai. A rotina era bem variada: controle de estoque, planilhas de indicadores, fluxo de documentos entre setores, registro de ponto, integração de novos aprendizes e aferições dos fornos numa base Access.',
  ],
  [
    'Boa parte do meu dia a dia era lançar informações registro por registro em planilhas ou sistemas. Convivendo com esse volume, comecei a querer entender como aquilo podia ser automatizado, e foi esse interesse que me trouxe para a tecnologia.',
  ],
  [
    'Comecei estudando por conta própria, testando linguagens até achar o que combinava comigo. Python é hoje a linguagem que mais uso e onde me sinto mais à vontade: é com ela que faço os dashboards, com pandas, NumPy e Plotly. Fora isso, já construí bots em Node.js, aplicações web em React e sistemas embarcados em C++. Cada projeto trouxe uma dificuldade que eu ainda não tinha enfrentado, e é aí que eu mais aprendo.',
  ],
  [
    'Gosto de participar desde o início: entender o problema, propor o caminho e desenhar a arquitetura e a experiência. O que me move é a solução funcionar no dia a dia de quem vai usar, do desenho até a entrega. Hoje um dos assuntos que mais me chama a atenção é inteligência artificial aplicada em empresas, onde vejo bastante potencial em processos que ainda são feitos registro por registro.',
  ],
  [
    'Busco meu primeiro estágio para ver de perto como uma empresa funciona por dentro: trabalhar em projetos reais, com um time, e aprender com quem já faz isso há mais tempo.',
  ],
];

export const TRAJETORIA = [
  { periodo: '2025 - 2028', nome: 'Engenharia de Software', org: 'FIAP, 2º ano em andamento', atual: true },
  {
    periodo: '2023 - 2024',
    nome: 'Aprendiz Administrativo',
    org: 'CBA, Companhia Brasileira de Alumínio',
    detalhe: 'Aferição dos fornos, controle de estoque e integração de novos aprendizes.',
  },
  { periodo: '2023 - 2024', nome: 'Técnico em Administração', org: 'Senai São Paulo' },
  {
    periodo: `Desde ${ANO_PRIMEIRO_CURSO}`,
    nome: 'Cursos complementares',
    org: `${HORAS_CURSOS} h na FIAP, na Alura e no Senai`,
    link: { texto: 'Ver certificados', href: '#certificacoes' },
  },
];

/* Embaixo do e-mail, no contato. */
export const DISPONIBILIDADE = [
  { rot: 'Disponibilidade', valor: 'Manhã ou tarde' },
  { rot: 'Modelo', valor: 'Presencial, híbrido ou remoto' },
];

/* Secoes na ordem da pagina. O menu do topo mostra todas menos o Inicio
   (a marca EDM ja leva pra la); o menu lateral mostra todas. */
export const SECOES_NAV = [
  { id: 'topo', rotulo: 'Início' },
  { id: 'projetos', rotulo: 'Projetos' },
  { id: 'trajetoria', rotulo: 'Trajetória' },
  { id: 'competencias', rotulo: 'Tecnologias' },
  { id: 'certificacoes', rotulo: 'Certificações' },
  { id: 'contato', rotulo: 'Contato' },
];

/* O numero de cada secao e a posicao dela nesta lista (Inicio e o 00).
   Assim nunca pula numero: incluir ou tirar uma secao renumera o resto. */
export const numeroDaSecao = (id) =>
  String(SECOES_NAV.findIndex((s) => s.id === id)).padStart(2, '0');
