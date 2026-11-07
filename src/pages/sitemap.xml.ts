import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import brandsData from '../data/brands.json';

export const GET: APIRoute = async () => {
  const site = 'https://clashjichang.world';
  const posts = await getCollection('blog');

  const staticPaths = [
    '',
    '/brands',
    '/speedtest',
    '/ranking',
    '/clients',
    '/guide',
    '/free',
    '/tools',
    '/warnings',
    '/faq',
    '/blog',
    '/privacy',
    '/terms'
  ];

  const brandPaths = brandsData.map((b) => `/brands/${b.slug}`);
  const blogPaths = posts.map((p) => `/blog/${p.id}`);

  const allPaths = [...staticPaths, ...brandPaths, ...blogPaths].sort();

  const urlEntries = allPaths
    .map((p) => `  <url><loc>${site}${p}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
};
