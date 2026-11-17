// @ts-check
import { defineConfig } from 'astro/config';

// Salida 100 % estática (`dist/`): sirve igual en GitHub Pages y en un VPS (nginx/Caddy).
// Variables opcionales al compilar:
//   SITE_URL  dominio público final   (por defecto el de GitHub Pages)
//   BASE_PATH subruta, si no va en la raíz (p. ej. /web)
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://novatic-cu.github.io',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
});
