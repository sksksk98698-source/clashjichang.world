import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import astroToc from 'astro-toc-smol';

export default defineConfig({
  site: 'https://clashjichang.world',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/404')
    }),
    astroToc({ articleSelector: '#article-content' })
  ],
  build: { inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()]
  }
});
