// @ts-check
import { defineConfig } from 'astro/config';

// Studio hub site config.
// PRD §6 — Astro + Cloudflare Pages, JS-zero by default.
export default defineConfig({
  site: 'https://tipsytapstudio.com',
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
