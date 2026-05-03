// Design tokens — PROVISIONAL VALUES.
// TODO(designer): finalize palette + typography. The values below are
// placeholders so the apps build; expect them to be overwritten.

export const colors = {
  hub: {
    // Hub stays monochrome (PRD §4 "色階層").
    background: '#0A0A0A',
    foreground: '#F5F5F5',
  },
  spv: {
    // SPV-2 may unlock chromagram-derived accents on the LP.
    // TODO(designer): pull from SPV_Concept.md once finalized.
    background: '#0A0A0A',
    foreground: '#F5F5F5',
    accent: '#7C5CFF',
  },
} as const;

export const typography = {
  // 1 family across every subdomain (PRD §4 "タイポグラフィ").
  // TODO(designer): confirm Inter vs Geist Sans before launch.
  fontFamily: 'Inter, sans-serif',
  headingTracking: '0.02em',
} as const;

export type Tokens = {
  colors: typeof colors;
  typography: typeof typography;
};
