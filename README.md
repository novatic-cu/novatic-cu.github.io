# NOVATIC — sitio corporativo

Astro (salida 100 % estática). Estructura fija en componentes; **todo el texto, enlaces e imágenes viven en JSON**.

## Editar contenido

Un archivo por sección en `src/content/site/`:

| Archivo | Contenido |
|---|---|
| `meta.json` | idioma, título y descripción SEO |
| `brand.json` · `nav.json` | marca, botón del header, menú |
| `hero.json` · `pillars.json` · `services.json` · `products.json` | secciones de la home |
| `values.json` · `quote.json` · `cta.json` · `contact.json` · `footer.json` | resto |

- Los esquemas están en `src/content.config.ts` (Zod). Un JSON inválido **rompe el build** indicando archivo y campo.
- Añadir un producto: nuevo objeto en `products.json` (`href` opcional vuelve la tarjeta un enlace).
- Imágenes: en `public/images/` y referenciadas como `/images/archivo.ext`.

## Comandos

```bash
pnpm dev       # desarrollo
pnpm build     # genera dist/
pnpm preview   # sirve dist/
```

## Despliegue

- **GitHub Pages (actual):** repo `novatic-cu/novatic-cu.github.io`, Pages en modo *GitHub Actions*. Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica en https://novatic-cu.github.io/. Al llegar el dominio propio: `SITE_URL=https://dominio` y, si aplica, `public/CNAME`.
- **VPS:** `SITE_URL=https://dominio pnpm build` y servir `dist/` con nginx/Caddy.
