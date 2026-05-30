// Stable sort for the Works grid.
//
// Order:
//   1. Featured first (true > false)
//   2. Status priority: live > beta > tinkering > sketch
//   3. addedAt descending (newer first)
//
// Pure function; safe to call at build time inside an Astro frontmatter block.

export type Status = 'live' | 'beta' | 'tinkering' | 'sketch';

// Works are grouped into these top-level categories on the hub. Tags are NOT
// used for grouping — they overlap (e.g. galton_timer is both gadget+clock but
// galton_tempo is gadget-only), so each work carries an explicit `category`.
// This array is the single source of truth for category *order* on the page.
export const CATEGORY_ORDER = ['extensions', 'clocks', 'games_visuals', 'stickers'] as const;
export type Category = (typeof CATEGORY_ORDER)[number];

// Card display size. Only SPV-2 is 'large' today; everything else is 'small'.
// Optional in data — absence means 'small'.
export type Size = 'large' | 'small';

export interface Work {
  slug: string;
  status: Status;
  category: Category;
  size?: Size;
  tags: string[];
  thumb: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  lpUrl: string | null;
  featured: boolean;
  addedAt: string;
}

const statusRank: Record<Status, number> = {
  live: 0,
  beta: 1,
  tinkering: 2,
  sketch: 3,
};

export function sortWorks(works: Work[]): Work[] {
  return [...works].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.status !== b.status) return statusRank[a.status] - statusRank[b.status];
    // String compare is fine because addedAt is ISO-like (YYYY-MM).
    return b.addedAt.localeCompare(a.addedAt);
  });
}

export interface WorksGroup {
  category: Category;
  items: Work[];
}

// Group works into the fixed CATEGORY_ORDER. Within each group, the existing
// sortWorks contract (featured > status > addedAt desc) is preserved, so the
// featured/live SPV-2 naturally heads the `extensions` block — and since it is
// the only 'large' card, the big card lands at the top of the section.
// Empty categories are dropped so the page never renders a heading with no items.
export function groupWorksByCategory(works: Work[]): WorksGroup[] {
  const sorted = sortWorks(works);
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: sorted.filter((w) => w.category === category),
  })).filter((g) => g.items.length > 0);
}
