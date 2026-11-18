import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

type SingleName =
  | 'meta' | 'brand' | 'nav' | 'hero' | 'sections' | 'values' | 'process'
  | 'company' | 'quote' | 'cta' | 'contact' | 'footer';

async function one<K extends SingleName>(name: K): Promise<CollectionEntry<K>['data']> {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`Falta src/content/site/${name}.json`);
  return entry.data as CollectionEntry<K>['data'];
}

/** Carga las secciones únicas del sitio (un JSON por sección). */
export async function getContent() {
  const [meta, brand, nav, hero, sections, values, process, company, quote, cta, contact, footer] =
    await Promise.all([
      one('meta'), one('brand'), one('nav'), one('hero'), one('sections'), one('values'),
      one('process'), one('company'), one('quote'), one('cta'), one('contact'), one('footer'),
    ]);
  return { meta, brand, nav, hero, sections, values, process, company, quote, cta, contact, footer };
}

/** Servicios públicos, en el orden definido en cada JSON. El `slug` es el nombre del archivo. */
export async function getServices() {
  const items = await getCollection('services', (e) => e.data.public);
  return items.sort((a, b) => a.data.order - b.data.order);
}

/** Productos públicos (nunca incluye los ocultos con `public: false`). */
export async function getProducts() {
  const items = await getCollection('products', (e) => e.data.public);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getLegalPages() {
  return getCollection('legal');
}

/** Prefija rutas absolutas con el `base` configurado (GitHub Pages / VPS). */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** Enlaces de contenido: `/ruta/` usa el base; `#ancla`, `mailto:` y URLs externas se respetan. */
export function link(href: string): string {
  return href.startsWith('/') ? asset(href) : href;
}

/** Enlace `mailto:` con asunto precargado: la solicitud llega ya clasificada. */
export function mailto(email: string, subject: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

export const AVAILABILITY_LABEL: Record<string, string> = {
  global: 'Todo el mundo',
  cuba: 'Solo para Cuba',
};

export const STATUS_LABEL: Record<string, string> = {
  disponible: 'Disponible',
  alpha: 'Alpha',
  proximamente: 'Próximamente',
  desarrollo: 'En desarrollo',
  planificado: 'Planificado',
};

/** `+53 5 000 0000` → `tel:+5350000000` */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
