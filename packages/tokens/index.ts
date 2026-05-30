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
    foreground: '#EFE7D6', // 暖オフホワイト、Brew 琥珀と調和 (was '#EDEDED')
    muted: '#A39C8A',      // 同系で muted (was '#9A9A9A')
    mutedOnBrew: '#D8CDB4', // anchor list / locale on Brew background
    rule: '#1F1F1F',       // hairline borders if ever needed
    borderHairline: '#1F1F1F', // alias of `rule`, exposed as --border-hairline for component-level borders
    badgeFgMono: '#3A3A3A',    // outline/inactive badge stroke color
    badgeBetaBg: '#2A2A2A',    // beta badge fill
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
  // Font Set C — 可変一本勝負 (PRD §4 "タイポグラフィ").
  // Fraunces variable (opsz/SOFT/wght 軸) が display + body 兼用。
  // :lang(ja) では Noto Serif JP (源ノ明朝) に切替。両方 @fontsource で
  // 自前ホスト (same-origin)、system serif がフォールバック。
  fontFamily:
    "'Fraunces Variable', 'Fraunces', ui-serif, Georgia, 'Times New Roman', serif", // display
  fontFamilyBody:
    "'Fraunces Variable', 'Fraunces', ui-serif, Georgia, 'Times New Roman', serif", // body
  fontFamilyJa:
    "'Noto Serif JP', 'Fraunces Variable', 'Fraunces', ui-serif, Georgia, serif",
  // Heading tracking — serif で字面を詰めて品格を出す。
  headingTracking: '-0.02em',
  bodyTracking: '0',
  // Display tracking — Hero 縦 3 段詰みで効く tight 値。
  displayTracking: '-0.03em',
  // Badge tracking — small uppercase chips (sans の名残で広め維持)。
  badgeTracking: '0.08em',
  // Line-height tokens
  lhTight: '1.15',
  lhNormal: '1.6',
  // Noto Serif JP の実体としてバンドルしている weights。
  // Fraunces は可変フォントのため数値より axes (opsz/SOFT/wght) で制御。
  weights: {
    regular: 400,
    medium: 500,
    bold: 700,
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
  // Section rhythm — clamp-driven vertical padding for top-level sections.
  section:    'clamp(4.5rem, 3rem + 6vw, 8rem)',
  sectionSm:  'clamp(3rem, 2rem + 3vw, 4.5rem)',
} as const;

// Typographic scale — built around clamp() so layouts stay fluid between
// mobile and desktop without media-query gymnastics.
export const fontSize = {
  // Body
  xs:   'clamp(0.75rem, 0.72rem + 0.15vw, 0.8125rem)',
  sm:   'clamp(0.875rem, 0.84rem + 0.18vw, 0.95rem)',
  base: 'clamp(1rem, 0.96rem + 0.2vw, 1.125rem)',
  lg:   'clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)',
  // Display — hero title sits here.
  xl:   'clamp(2rem, 1.4rem + 3vw, 3.75rem)',
  '2xl':'clamp(2.5rem, 1.6rem + 4.5vw, 5rem)',
  '3xl':'clamp(3rem, 2rem + 5vw, 6rem)',
} as const;

// Border-radius scale — keep semantic (cards vs pill chips).
export const radius = {
  card: '0.5rem',
  chip: '999px',
} as const;

// --- Hub Brew background overlay tokens ---
// Used by hub sections to remain legible while the sticky Brew WebGL
// background scrolls underneath. Mirrored as CSS vars in apps/hub/src/
// layouts/Base.astro :root (--overlay-soft / --overlay-strong /
// --card-bg-onbrew / --card-border-onbrew / --text-shadow-onbrew).
export const overlay = {
  soft: 'rgba(11, 11, 11, 0.35)',   // Works section — light veil, Brew shows through
  strong: 'rgba(11, 11, 11, 0.6)',  // Manifesto / About — heavier veil for prose legibility
} as const;

// 2026-05-30 トーン整合 (warm pivot 追随, designer spec): 純黒/純白 → 暖暗褐/暖白。
// bg α 0.55→0.66 は明部 Brew 透け時の desc AA 違反 (4.10:1) を 4.88:1 へ回復。
// media / shadow も追加。Base.astro :root の --card-* と同値ミラー (手動同期)。
export const cardOnBrew = {
  bg: 'rgba(20, 16, 8, 0.66)',
  border: 'rgba(239, 231, 214, 0.14)',
  mediaBg: '#16120A',
  shadow: '0 1px 2px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(8, 5, 0, 0.4)',
  shadowHover: '0 2px 4px rgba(0, 0, 0, 0.45), 0 14px 36px rgba(8, 5, 0, 0.5)',
} as const;

export const textShadowOnBrew = '0 1px 2px rgba(0, 0, 0, 0.55), 0 0 12px rgba(0, 0, 0, 0.3)';

// --- Hub Brew background parameters ---
// Sticky WebGL background mounted in Base.astro for all hub pages (NOT /lab/).
// Auto-cycles pilsner → wit → ipa on a `periodSec` loop with `dwellRatio`
// dwell + smoothstep crossfade. Consumed directly inside HubBrewBackground.astro
// as JS constants (same pattern as `lab.flux` / `lab.brew`).
export const hub = {
  brew: {
    speed: 0.1,
    intensity: 1.0,
    periodSec: 180,
    dwellRatio: 0.75,
    initial: 'pilsner',
  },
} as const;

// Lab-scope tokens — used only under /lab/. Do not reuse `labShade1/2` outside
// of Lab experiments (the Hub hero must stay flat-monochrome per PRD §4).
// Mirrored as CSS vars (--lab-*) in apps/hub/src/layouts/Base.astro :root.
export const lab = {
  canvasMinH: '100svh',
  shade1: '#1A1A1A', // Lab Drift only
  shade2: '#262626', // Lab Drift only
  shade2Hi: '#4A4A4A', // Lab Drift Intensity max stop (v2)
  driftBlur: '40px',   // Lab Drift cheap-look mitigation (v2)
  grainAlphaMax: 0.55, // Lab Grain max overlay alpha (v2)
  overlayBg: 'rgba(11, 11, 11, 0.6)',
  easeFlux: 'cubic-bezier(0.4, 0, 0.2, 1)',
  flux: {
    // Lab Flux v2 "深海の漂流" — designer-confirmed.
    colA: '#0C1014', // oklch(0.12 0.02 240) — deep dark
    colB: '#3A4654', // oklch(0.32 0.04 220) — cool muted highlight
    hueShiftDeg: 15,
    hueShiftPeriodSec: 90,
  },
  brew: {
    // Lab Brew #002 — designer-confirmed 3-beer set, manual switch (B1).
    // Colour identity comes from one of three beer palettes selected by the
    // visitor via BrewSwitch; BrewCanvas tweens colA/colB in OKLab space
    // (CPU-side lerp) over `switch.tweenMs`. Consumed directly inside
    // BrewCanvas / BrewSwitch (JS constants), not mirrored as CSS vars —
    // same convention as `flux`.
    cycle: [
      { name: 'pilsner', colA: '#0F0C05', colB: '#92711B' }, // H42-46, S35→78, L4→32
      { name: 'wit',     colA: '#0F0E0A', colB: '#7C6F49' }, // H48-50, S18→28, L5→38
      { name: 'ipa',     colA: '#0E0905', colB: '#6E4A1E' }, // H25-30, S50-58, L3→27 (legacy)
    ],
    switch: {
      dotSize: '8px',
      transitionMs: 160, // hover/active background-color/color transition
      tweenMs: 240,      // colA/B OKLab tween on beer change
    },
  },
} as const;

export type Tokens = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  fontSize: typeof fontSize;
  radius: typeof radius;
  overlay: typeof overlay;
  cardOnBrew: typeof cardOnBrew;
  textShadowOnBrew: typeof textShadowOnBrew;
  hub: typeof hub;
  lab: typeof lab;
};
