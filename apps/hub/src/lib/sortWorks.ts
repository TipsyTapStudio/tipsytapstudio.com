// Stable sort for the Works grid.
//
// Order:
//   1. Featured first (true > false)
//   2. Status priority: live > beta > tinkering > sketch
//   3. addedAt descending (newer first)
//
// Pure function; safe to call at build time inside an Astro frontmatter block.

export type Status = 'live' | 'beta' | 'tinkering' | 'sketch';

export interface Work {
  slug: string;
  status: Status;
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
