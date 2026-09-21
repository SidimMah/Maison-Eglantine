import type { APIRoute } from 'astro';
import { products } from '../data/products';

export const GET: APIRoute = () => {
  const base = 'https://www.maison-eglantine.com';
  const pages = ['/', '/pret-a-porter/', '/traditionnel/', '/livraison/', '/contact/'];
  const urls = [...pages, ...products.map((product) => `/produit/${product.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${base}${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
