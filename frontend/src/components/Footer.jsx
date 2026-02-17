/*
Footer = rodapé do site 
*/
export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-default">Eduardo Delorenzo Moraes © {ano}</div>
    </footer>
  );
}
