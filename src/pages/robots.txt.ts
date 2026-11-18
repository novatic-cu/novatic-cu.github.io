import type { APIRoute } from 'astro';
import { getContent } from '../lib/content';

// Mientras `meta.indexable` sea false, el sitio pide a los buscadores que no lo indexen.
export const GET: APIRoute = async ({ site }) => {
  const { meta } = await getContent();
  const body = meta.indexable
    ? `User-agent: *\nAllow: /\n${site ? `\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n` : ''}`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
