import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Todo el contenido del sitio vive en `src/content/site/*.json`.
 * Un archivo = una sección. Si un JSON no cumple su esquema, el build falla
 * indicando archivo y campo, así no se publica contenido roto.
 */
const single = <T extends z.ZodType>(name: string, schema: T) =>
  defineCollection({
    loader: glob({ pattern: `${name}.json`, base: './src/content/site' }),
    schema,
  });

const link = z.object({ label: z.string(), href: z.string() });
const stat = z.object({ value: z.string(), label: z.string() });
const sectionHead = { kicker: z.string(), title: z.string() };

export const collections = {
  meta: single(
    'meta',
    z.object({ lang: z.string(), title: z.string(), description: z.string() }),
  ),
  brand: single(
    'brand',
    z.object({ name: z.string(), suffix: z.string(), navCta: z.string(), navCtaHref: z.string() }),
  ),
  nav: single('nav', z.object({ items: z.array(link).min(1) })),
  hero: single(
    'hero',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      ctaPrimary: z.string(),
      ctaPrimaryHref: z.string(),
      ctaSecondary: z.string(),
      ctaSecondaryHref: z.string(),
      image: z.string(),
      imageAlt: z.string(),
      badge: z.object({ label: z.string(), value: z.string() }),
      stats: z.array(stat),
    }),
  ),
  pillars: single(
    'pillars',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      items: z.array(
        z.object({
          tag: z.string(),
          name: z.string(),
          desc: z.string(),
          features: z.array(z.string()),
        }),
      ),
    }),
  ),
  services: single(
    'services',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      categories: z.array(z.object({ name: z.string(), items: z.array(z.string()) })),
    }),
  ),
  products: single(
    'products',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      items: z.array(
        z.object({
          name: z.string(),
          tag: z.string(),
          desc: z.string(),
          status: z.string(),
          /** Si se define, la tarjeta completa se vuelve un enlace. */
          href: z.string().optional(),
          cta: z.string().optional(),
        }),
      ),
    }),
  ),
  values: single(
    'values',
    z.object({
      ...sectionHead,
      items: z.array(z.object({ title: z.string(), desc: z.string() })),
      stats: z.array(stat),
    }),
  ),
  quote: single('quote', z.object({ text: z.string(), author: z.string(), role: z.string() })),
  cta: single(
    'cta',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      button: z.string(),
      buttonHref: z.string(),
      secondary: z.string(),
      secondaryHref: z.string(),
    }),
  ),
  contact: single(
    'contact',
    z.object({ email: z.string(), phone: z.string(), address: z.string() }),
  ),
  footer: single(
    'footer',
    z.object({
      tagline: z.string(),
      columns: z.array(z.object({ title: z.string(), links: z.array(link) })),
      legal: z.string(),
      legalLinks: z.array(link),
    }),
  ),
};
