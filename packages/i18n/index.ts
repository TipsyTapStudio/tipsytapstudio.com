// Lightweight i18n helper for the Tipsy Tap Studio monorepo.
//
// Keys follow the flat convention `<scope>_<section>_<element>[_variant]`
// (e.g. `hub_hero_title`, `spv_privacy_neg_no_dom_injection`,
// `common_footer_contact`). All locales are required to share the exact same
// key set; `scripts/check-locale-parity.mjs` enforces this at build time.

import ja from './locales/ja.json' with { type: 'json' };
import en from './locales/en.json' with { type: 'json' };

export type Locale = 'ja' | 'en';

export const locales: readonly Locale[] = ['ja', 'en'] as const;
export const defaultLocale: Locale = 'ja';

const dictionaries: Record<Locale, Record<string, string>> = {
  ja: ja as Record<string, string>,
  en: en as Record<string, string>,
};

/**
 * Look up a translated string for the given key + locale.
 * If the key is missing, logs a warning and returns the key itself
 * so that placeholders surface visibly in dev.
 */
export function t(key: string, locale: Locale): string {
  const dict = dictionaries[locale];
  const value = dict?.[key];
  if (value === undefined) {
    // eslint-disable-next-line no-console
    console.warn(`[@ttsui/i18n] Missing key "${key}" for locale "${locale}".`);
    return key;
  }
  return value;
}

export { ja, en };
