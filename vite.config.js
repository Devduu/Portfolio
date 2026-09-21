import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Endereco publico do site, usado nas meta tags do index.html (%SITE%).
   O LinkedIn so mostra a imagem de capa quando o endereco e completo.
   Na Vercel ele vem sozinho (VERCEL_PROJECT_PRODUCTION_URL). Fora dela da
   pra forcar com SITE_URL=https://... Sem nenhum dos dois, fica relativo. */
const SITE = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '')
).replace(/\/$/, '');

const metaComEndereco = {
  name: 'meta-com-endereco',
  transformIndexHtml: (html) => html.replaceAll('%SITE%', SITE),
};

export default defineConfig({
  plugins: [react(), metaComEndereco],
  server: {
    port: 5173
  }
});
