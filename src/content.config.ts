import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Todo el contenido del sitio vive en JSON (y Markdown para los textos legales).
 *  - `src/content/site/*.json`   secciones únicas (un archivo = una sección)
 *  - `src/content/services/*.json` un archivo por servicio
 *  - `src/content/products/*.json` un archivo por producto
 *  - `src/content/legal/*.md`      textos legales
 * Si un archivo no cumple su esquema, el build falla indicando archivo y campo.
 */
const single = <T extends z.ZodType>(name: string, schema: T) =>
  defineCollection({
    loader: glob({ pattern: `${name}.json`, base: './src/content/site' }),
    schema,
  });

const link = z.object({ label: z.string(), href: z.string() });
const stat = z.object({ value: z.string(), label: z.string() });
const sectionHead = { kicker: z.string(), title: z.string() };

/** Estados que puede mostrar el sitio. `desarrollo` y `planificado` existen solo para guardar datos ocultos. */
/** Alcance geográfico. Por defecto todo es para todo el mundo; un producto declara `cuba` si es solo para Cuba. */
const availability = z.enum(['global', 'cuba']).default('global');

export const PRODUCT_STATUS = ['disponible', 'alpha', 'proximamente', 'desarrollo', 'planificado'] as const;

export const collections = {
  meta: single(
    'meta',
    z.object({
      lang: z.string(),
      title: z.string(),
      description: z.string(),
      /** false = el sitio pide a los buscadores que no lo indexen (antes del lanzamiento). */
      indexable: z.boolean(),
    }),
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
  sections: single(
    'sections',
    z.object({
      services: z.object({ ...sectionHead, subtitle: z.string(), note: z.string() }),
      products: z.object({ ...sectionHead, subtitle: z.string() }),
    }),
  ),
  values: single(
    'values',
    z.object({ ...sectionHead, items: z.array(z.object({ title: z.string(), desc: z.string() })) }),
  ),
  process: single(
    'process',
    z.object({
      ...sectionHead,
      steps: z.array(z.object({ title: z.string(), desc: z.string() })),
      note: z.string().optional(),
    }),
  ),
  quote: single('quote', z.object({ text: z.string(), author: z.string(), role: z.string() })),
  company: single(
    'company',
    z.object({ title: z.string(), lead: z.string(), paragraphs: z.array(z.string()) }),
  ),
  cta: single(
    'cta',
    z.object({
      ...sectionHead,
      subtitle: z.string(),
      button: z.string(),
      buttonSubject: z.string(),
      secondary: z.string(),
      secondaryHref: z.string(),
    }),
  ),
  contact: single(
    'contact',
    z.object({
      email: z.string(),
      address: z.string(),
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
    }),
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

  services: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/services' }),
    schema: z.object({
      order: z.number(),
      featured: z.boolean().default(false),
      public: z.boolean().default(true),
      availability,
      brandName: z.string(),
      name: z.string(),
      summary: z.string(),
      lead: z.string(),
      includes: z.array(z.string()).min(1),
      outcomes: z.array(z.string()).min(1),
      audience: z.string(),
      billing: z.string(),
    }),
  }),

  products: defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/products' }),
    schema: z
      .object({
        order: z.number(),
        featured: z.boolean().default(false),
        public: z.boolean().default(true),
        availability,
        status: z.enum(PRODUCT_STATUS),
        name: z.string(),
        tagline: z.string(),
        summary: z.string(),
        features: z.array(z.string()),
        howItWorks: z.array(z.object({ title: z.string(), desc: z.string() })).optional(),
        pricingNote: z.string().optional(),
        note: z.string().optional(),
        href: z.string().optional(),
        hrefLabel: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaSubject: z.string().optional(),
      })
      .refine((p) => !p.public || (p.status !== 'desarrollo' && p.status !== 'planificado'), {
        message: 'Un producto en desarrollo o planificado no puede ser público (public: false).',
        path: ['status'],
      }),
  }),

  legal: defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/legal' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      updated: z.string(),
      draft: z.boolean().default(false),
    }),
  }),
};
