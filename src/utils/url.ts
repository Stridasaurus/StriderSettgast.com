/**
 * Prefixes an internal path with the site's base path so links work whether the
 * site is served from a subpath (GitHub Pages project site) or a domain root.
 *
 * Always pass root-relative app paths, e.g. withBase('/blog').
 * import.meta.env.BASE_URL is set from `base` in astro.config.mjs.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const trimmedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith('/') ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}`;
}
