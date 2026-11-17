import { getEntry, type CollectionEntry } from 'astro:content';

type Name = keyof import('astro:content').DataEntryMap;

async function one<K extends Name>(name: K): Promise<CollectionEntry<K>['data']> {
  const entry = await getEntry(name, name);
  if (!entry) throw new Error(`Falta src/content/site/${name}.json`);
  return entry.data as CollectionEntry<K>['data'];
}

/** Carga todo el contenido del sitio (un JSON por sección). */
export async function getContent() {
  const [meta, brand, nav, hero, pillars, services, products, values, quote, cta, contact, footer] =
    await Promise.all([
      one('meta'), one('brand'), one('nav'), one('hero'), one('pillars'), one('services'),
      one('products'), one('values'), one('quote'), one('cta'), one('contact'), one('footer'),
    ]);
  return { meta, brand, nav, hero, pillars, services, products, values, quote, cta, contact, footer };
}

/** Prefija rutas de `public/` con el `base` configurado (GitHub Pages / VPS). */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/** `+53 5 000 0000` → `tel:+5350000000` */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
