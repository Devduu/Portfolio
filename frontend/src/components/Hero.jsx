import profileImage from '../assets/profile/profile.jpg';

/*
Hero = primeira seção que aparece no site.
Aqui ficam: apresentação, subtítulo, botão e foto.
*/
export default function Hero() {
  return (
    <section id="hero" className="container-default hero">
      {/* Bloco de texto */}
      <div>
        <p className="text-cyan-300 m-0 mb-2 text-sm">Desenvolvedor Backend</p>
        <h1 className="hero-title">Oi, eu sou o Eduardo</h1>
        <p className="hero-subtitle">Estudante de Engenharia de Software, com foco em Backend.</p>

        {/* Botão leva até a seção de contato */}
        <a href="#contato" className="btn btn-primary">
          Entrar em contato
        </a>
      </div>

      {/* Bloco da foto */}
      <div className="flex justify-center md:justify-end">
        <img src={profileImage} alt="Foto de perfil" className="hero-photo" />
      </div>
    </section>
  );
}
