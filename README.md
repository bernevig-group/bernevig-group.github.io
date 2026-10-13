# Bernevig Group website

Static site built with [Astro](https://astro.build). All content lives in a few plain files, so most
edits never touch HTML.

| To change | Edit |
| --- | --- |
| Group members, alumni, PI bio | `src/data/people.ts` (photos go in `public/people/`) |
| Research areas and their text | `src/data/research.ts` |
| Selected publications | `src/data/selected.ts` (arXiv ids) |
| Talks and lecture series | `src/data/talks.ts` (YouTube ids) |
| Address, email, menu | `src/data/site.ts` |
| Page layout and style | `src/layouts/Base.astro`, `src/styles/global.css` |

The full publication list (`src/data/publications.json`) is generated from arXiv by
`scripts/fetch_publications.py`. The deploy workflow reruns it every Monday, so new papers appear on
their own. The research figures are computed by `scripts/make_figures.py` (numpy + matplotlib).

## Preview locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Deploy

Push to `main` on GitHub with Pages enabled (Settings → Pages → Source: GitHub Actions). The workflow in
`.github/workflows/deploy.yml` builds and publishes the site. For a custom domain, add it under
Settings → Pages and point a CNAME record at `<user>.github.io`.
