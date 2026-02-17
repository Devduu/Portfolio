/*
Contato = seção com links para email, LinkedIn e GitHub.
*/
export default function Contact() {
  return (
    <section id="contato" className="section">
      <div className="container-default card">
        <h2 className="section-title">Contato</h2>

        <div className="contact-list">
          <a className="contact-link" href="mailto:eduardodmoraes@icloud.com">
            Email: eduardodmoraes@icloud.com
          </a>

          <a
            className="contact-link"
            href="https://www.linkedin.com/in/eduardo-delorenzo-moraes-23654a325/"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin: Eduardo Delorenzo Moraes
          </a>

          <a className="contact-link" href="https://github.com/Devduu" target="_blank" rel="noreferrer">
            GitHub: Devduu
          </a>
        </div>
      </div>
    </section>
  );
}
