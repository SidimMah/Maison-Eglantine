import type { APIRoute } from 'astro';

export const GET: APIRoute = () => new Response(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /panier/
Disallow: /commande/
Disallow: /confirmation/

Sitemap: https://www.maison-eglantine.com/sitemap.xml
`, {
  headers: { 'Content-Type': 'text/plain; charset=utf-8' }
});
