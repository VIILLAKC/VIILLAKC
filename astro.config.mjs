// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Publicado en https://viillakc.github.io/VIILLAKC/
export default defineConfig({
  site: 'https://viillakc.github.io',
  base: '/VIILLAKC',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-MX', en: 'en-US' } },
      filter: (page) => !page.includes('/404'),
    }),
  ],
  build: {
    // CSS pequeño en línea: evita una petición que bloquea el render.
    inlineStylesheets: 'always',
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  vite: {
    plugins: [tailwindcss()],
  },
});
