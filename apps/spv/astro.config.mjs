// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SPV-2 LP — `spv.tipsytapstudio.com`.
// PRD §6 — Astro + Cloudflare Pages, JS-zero by default.
//
// 2026-06-07: English-only for now. The Japanese copy read awkwardly to the
// author, so we focus on a strong EN page first and revisit whether JA is
// needed later. The spv_* i18n keys stay in both locale files (parity), but
// only /en/ is built and linked.
export default defineConfig({
  site: 'https://spv.tipsytapstudio.com',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
    },
  },
  // @astrojs/sitemap — outputs sitemap-index.xml (+ sitemap-0.xml) to match
  // the existing public/robots.txt `Sitemap:` declaration. en 単一なので
  // i18n オプションは不要(素の sitemap() でよい)。
  integrations: [sitemap()],
});
