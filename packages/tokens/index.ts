// Design tokens — Hub Phase 1 (provisional but usable).
//
// Values below are the engineer's first pass for the studio hub Hero.
// They satisfy PRD §4 ("色階層" — hub stays monochrome) and are deliberately
// boring so a future designer pass can refine without churning markup.
//
// 暫定値、デザイナー / マーケ確定待ち。

export const colors = {
  hub: {
    // Hub stays monochrome (PRD §4 "色階層"). Saturation = 0 by design.
    background: '#0B0B0B', // near-black, slightly off true #000 to ease eyes
    foreground: '#EDEDED', // off-white, primary text
    muted: '#9A9A9A',      // secondary text / dividers — WCAG AA on #0B0B0B (6.79:1)
    rule: '#1F1F1F',       // hairline borders if ever needed
  },
  spv: {
    // SPV-2 may unlock chromagram-derived accents on its LP.
    // TODO(designer): pull from SPV_Concept.md once finalized.
    background: '#0B0B0B',
    foreground: '#EDEDED',
    accent: '#7C5CFF',
  },
} as const;

export const typography = {
  // 1 family across every subdomain (PRD §4 "タイポグラフィ").
  // Inter is bundled via @fontsource/inter (self-hosted, same-origin) in
  // Base layouts; system stack is the graceful fallback when the font fails.
  // 暫定値、デザイナー確定待ち。
  fontFamily:
    '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Hiragino Sans", "Noto Sans JP", sans-serif',
  // Heading tracking — wide enough to feel "document-y" without becoming a
  // visual quirk (PRD §4: "ドキュメント・論文ぽさ").
  headingTracking: '0.04em',
  bodyTracking: '0.01em',
  // Weights actually bundled. Keep this list in sync with the
  // @fontsource/inter imports in apps/hub/src/layouts/Base.astro.
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
} as const;

// rem-based 8-step spacing scale. 1rem == 16px by default.
// Naming follows the t-shirt size convention so semantic intent reads cleanly
// at call sites (e.g. `padding: var(--space-lg)` rather than `--space-5`).
export const spacing = {
  '3xs': '0.25rem', //  4px
  '2xs': '0.5rem',  //  8px
  xs:   '0.75rem',  // 12px
  sm:   '1rem',     // 16px
  md:   '1.5rem',   // 24px
  lg:   '2rem',     // 32px
  xl:   '3rem',     // 48px
  '2xl': '4.5rem',  // 72px
  '3xl': '6rem',    // 96px
} as const;

// Typographic scale — built around clamp() so layouts stay fluid between
// mobile and desktop without media-query gymnastics.
export const fontSize = {
  // Body
  sm:   'clamp(0.875rem, 0.84rem + 0.18vw, 0.95rem)',
  base: 'clamp(1rem, 0.96rem + 0.2vw, 1.125rem)',
  lg:   'clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)',
  // Display — hero title sits here.
  xl:   'clamp(2rem, 1.4rem + 3vw, 3.75rem)',
  '2xl':'clamp(2.5rem, 1.6rem + 4.5vw, 5rem)',
} as const;

export type Tokens = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
};
