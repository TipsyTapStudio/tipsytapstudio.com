// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  // @astrojs/sitemap — outputs sitemap-index.xml (+ sitemap-0.xml) to match
  // the existing public/robots.txt `Sitemap:` declaration. i18n オプションで
  // 各ページに ja/en の hreflang(xhtml:link) 注釈を埋め込む。
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ja',
        locales: { ja: 'ja', en: 'en' },
      },
    }),
  ],
});
