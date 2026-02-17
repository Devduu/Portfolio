/*
Sobre = seção com 3 cards explicando seu foco.
*/
export default function About() {
  return (
    <section id="sobre" className="section">
      <div className="container-default">
        <h2 className="section-title">Sobre</h2>

        <div className="grid-3">
          {/* Card 1 */}
          <article className="card about-card">
            <span className="about-icon">{'<>'}</span>
            <h3 className="m-0 mb-2 text-xl">Backend</h3>
            <p className="m-0 text-slate-300">
              Desenvolvo APIs e aplicações utilizando Node.js, Java e Python. Tenho experiência na criação
              de sistemas organizados, integração com bancos de dados e consumo de APIs REST, sempre focando
              em clareza de código e boas práticas.
            </p>
          </article>

          {/* Card 2 */}
          <article className="card about-card">
            <span className="about-icon">IoT</span>
            <h3 className="m-0 mb-2 text-xl">IoT &amp; Edge</h3>
            <p className="m-0 text-slate-300">
              Trabalho com projetos de IoT utilizando ESP32, MQTT e FIWARE. Já desenvolvi soluções
              envolvendo envio de dados em tempo real, integração com brokers e manipulação de
              informações para dashboards e monitoramento.
            </p>
          </article>

          {/* Card 3 */}
          <article className="card about-card">
            <span className="about-icon">API</span>
            <h3 className="m-0 mb-2 text-xl">Ferramentas</h3>
            <p className="m-0 text-slate-300">
              Utilizo Git para versionamento, Docker para containerização e Postman para testes de APIs.
              Busco manter meus projetos organizados, funcionais e próximos de um ambiente real de
              desenvolvimento.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
