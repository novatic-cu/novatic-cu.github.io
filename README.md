# novatic-cu.github.io

Sitio corporativo de NOVATIC S.U.R.L. — **https://novatic-cu.github.io/**

Single-file (`index.html`) con sistema visual propio: Instrument Serif + Inter, tinta `#0A1420`, oro `#B8985A` y papel `#FAFAF7`. Las fuentes se sirven localmente desde `fonts/`.

## Producto

Hoy el único producto publicado es **NovaFlix**, con enlace a <https://novatic-cu.github.io/NovaFlix/>.

## Panel de administración

- Se abre con el botón discreto de la esquina inferior derecha (`⚙`) o con el pill **Panel**.
- Contraseña por defecto: `novatic2026` (cámbiala en *Cambiar contraseña*; se guarda en `localStorage`).
- Permite editar textos en línea, imágenes, listas y **añadir/quitar productos** con su **URL de destino** (`href`).
- *Exportar JSON* descarga `content.json`; *Importar JSON* lo carga.

### Publicar cambios

Las ediciones del panel viven en `localStorage` (solo tu navegador). Para que las vean todos:

1. En el panel, pulsa **Exportar JSON** → obtienes `content.json`.
2. Sustituye `content.json` en este repositorio.
3. `git add content.json && git commit -m "content: ..." && git push`.

`index.html` combina, en este orden: contenido por defecto → `content.json` → `localStorage` (el editor local gana mientras editas).

### Añadir un producto nuevo

Panel → *Productos SaaS* → **+ Añadir** → rellena Nombre, Etiqueta, Descripción, Estado y **URL de destino**. La tarjeta se vuelve enlace automáticamente. Exporta y publica.

## Desarrollo local

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Licencia

Contenido y marca © 2026 NOVATIC S.U.R.L.
