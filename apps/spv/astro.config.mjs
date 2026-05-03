// @ts-check
import { defineConfig } from 'astro/config';

// SPV-2 LP — `spv.tipsytapstudio.com`.
// PRD §6 — Astro + Cloudflare Pages, JS-zero by default.
export default defineConfig({
  site: 'https://spv.tipsytapstudio.com',
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
