# NOVATIC — sitio corporativo

Sitio de venta de NOVATIC: servicios (principal) y productos. Astro, salida 100 % estática.
Estructura fija en componentes; **todo el contenido vive en JSON** (y Markdown para los textos legales).
El plan y las reglas de contenido están en la nota 29 del vault de Obsidian.

## Editar contenido

| Qué | Dónde |
|---|---|
| Un servicio | `src/content/services/<slug>.json` (un archivo por servicio; `order` fija la posición, `featured` lo destaca) |
| Un producto | `src/content/products/<slug>.json` |
| Secciones de la home, menú, contacto, pie, marca | `src/content/site/*.json` |
| Textos legales | `src/content/legal/*.md` |
| Imágenes | `public/images/` (se referencian como `/images/archivo.ext`) |

Reglas que el esquema (`src/content.config.ts`) hace cumplir:

- Un producto con `status` `desarrollo` o `planificado` **no puede ser público**: debe llevar `"public": false`. Si no, el build falla.
- Estados públicos permitidos: `disponible`, `alpha`, `proximamente`.
- Un JSON inválido rompe el build indicando archivo y campo.
- Los productos con `public: false` se conservan en los datos pero no aparecen en ninguna página (ni en el pie).

Pautas de contenido: solo lo publicado; sin precios (por contrato); sin cifras internas; sin El Patio ni herramientas internas NOVA*. Tono: frases cortas, verbos activos, «usted».

## Comandos

```bash
pnpm dev       # desarrollo
pnpm build     # genera dist/
pnpm preview   # sirve dist/
```

## Antes del lanzamiento

Hoy el sitio pide a los buscadores que **no lo indexen** (`"indexable": false` en `src/content/site/meta.json`; genera `noindex` y un `robots.txt` que lo bloquea). Al lanzar:

1. Cambiar `indexable` a `true`.
2. Compilar con `SITE_URL=https://su-dominio` (canónicas, sitemap y Open Graph usan ese dominio).
3. Revisar los textos legales (`src/content/legal/*.md`, marcados `draft: true`) y quitar `draft` cuando estén revisados.
4. Confirmar el correo de contacto y añadir teléfono o WhatsApp en `contact.json` (son opcionales).
5. Sustituir `public/images/hero.svg` (imagen provisional).

## Despliegue

- **GitHub Pages (actual):** repo `novatic-cu/novatic-cu.github.io`, Pages en modo *GitHub Actions*. Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica en https://novatic-cu.github.io/. Con dominio propio en Pages, añadir `public/CNAME`.
- **VPS:** `SITE_URL=https://su-dominio pnpm build`, copiar `dist/` al servidor y servirlo con nginx (`deploy/nginx.conf.example`) o Caddy (`deploy/Caddyfile.example`). Ejemplo de copia:

```bash
rsync -az --delete dist/ usuario@vps:/var/www/novatic/dist/
```
