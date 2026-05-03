#!/usr/bin/env node
/**
 * Verify that every locale JSON file under packages/i18n/locales/ exposes
 * the exact same set of keys. Exits with code 1 on mismatch — wired into
 * the root `prebuild` script so CI / Cloudflare Pages catch drift before
 * we ship a half-translated build.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '..', 'packages', 'i18n', 'locales');

const files = readdirSync(localesDir).filter((f) => f.endsWith('.json'));
if (files.length < 2) {
  console.log(`[check-locale-parity] only ${files.length} locale file(s); skipping.`);
  process.exit(0);
}

const dicts = Object.fromEntries(
  files.map((f) => [f, JSON.parse(readFileSync(join(localesDir, f), 'utf8'))]),
);

const reference = files[0];
const refKeys = new Set(Object.keys(dicts[reference]));

let ok = true;
for (const f of files.slice(1)) {
  const keys = new Set(Object.keys(dicts[f]));
  const missing = [...refKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !refKeys.has(k));
  if (missing.length || extra.length) {
    ok = false;
    console.error(`[check-locale-parity] ${f} differs from ${reference}:`);
    if (missing.length) console.error(`  missing: ${missing.join(', ')}`);
    if (extra.length) console.error(`  extra:   ${extra.join(', ')}`);
  }
}

if (!ok) {
  console.error('[check-locale-parity] locale parity check failed.');
  process.exit(1);
}
console.log(`[check-locale-parity] OK (${files.length} locales, ${refKeys.size} keys).`);
