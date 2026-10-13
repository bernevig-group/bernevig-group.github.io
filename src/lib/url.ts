// Prefix site-internal paths with the deploy base (e.g. "/repo-name" on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const u = (path: string) => base + (path.startsWith("/") ? path : "/" + path);
